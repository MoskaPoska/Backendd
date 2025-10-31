import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';

@Injectable()
export class AzureBlobService {
    private readonly blobServiceClient: BlobServiceClient;
    private readonly containerName: string;

    constructor(private configService: ConfigService) {
        const connectionString = this.configService.get<string>('AZURE_STORAGE_CONNECTION_STRING');
        this.containerName = this.configService.get<string>('AZURE_STORAGE_CONTAINER_NAME') || 'course-images';

        if (!connectionString) {
            throw new InternalServerErrorException('Рядок підключення до сховища Azure відсутній.');
        }

        this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        this.ensureContainerExists();
    }

    private async ensureContainerExists() {
        const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
        await containerClient.createIfNotExists();
    }

    private getBlockBlobClient(fileName: string): BlockBlobClient {
        const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
        return containerClient.getBlockBlobClient(fileName);
    }

    /**
     * Завантажує буфер у Azure Blob Storage.
     * @param file - Об'єкт файлу від Multer.
     * @returns URL завантаженого зображення.
     */
    async uploadFile(file: Express.Multer.File): Promise<string> {
        const fileExtension = file.originalname.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExtension}`;
        const blockBlobClient = this.getBlockBlobClient(fileName);

        try {
            await blockBlobClient.uploadData(file.buffer, {
                blobHTTPHeaders: { blobContentType: file.mimetype },
            });
            return blockBlobClient.url;
        } catch (error) {
            console.error('Azure Blob Upload Error:', error);
            throw new InternalServerErrorException('Помилка завантаження файлу в Azure.');
        }
    }
}