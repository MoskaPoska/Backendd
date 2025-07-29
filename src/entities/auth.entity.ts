import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @Column({ nullable: true })
    firstName: string;

    @Column({ nullable: true })
    lastName: string;

    @Column({ default: true })
    isActive: boolean;

    //@Column({ default: 'user' })
    //role: string;

    //@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    //createdAt: Date;

    //@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    //updatedAt: Date;
}