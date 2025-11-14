import { IsNumber, Min } from 'class-validator';


export enum StatCategory {
    GRAMMAR = 'grammar_xp',
    VOCABULARY = 'vocabulary_xp',
    WRITING = 'writing_xp',
    SPEAKING = 'speaking_xp',
    LISTENING = 'listening_xp',
}

export class UpdateStatDto {
    @IsNumber()
    @Min(1)
    xp_gained: number;

    @IsNumber()
    category: StatCategory;
}