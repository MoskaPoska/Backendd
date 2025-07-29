import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany} from "typeorm"; // Добавьте JoinColumn
import { Language } from "./language.entity";
import {Lesson} from "./lesson.entity";

@Entity("courses")
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'int', nullable: false })
    language_id: number; // Внешний ключ

    @Column({ type: 'varchar', length: 50, default:'beginner' })
    difficulty_level: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image_url: string;


    // @ManyToOne(() => Language, language => language.courses)
    // @JoinColumn({ name: 'language_id' })
    // language: Language;

    // @OneToMany(() => Lesson, lesson => lesson.courses)
    // lessons: Lesson[];
}