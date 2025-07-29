import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Course } from './course.entity';

@Entity('languages')
export class Language {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 10, unique: true, nullable: false })
    code: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    icon_url: string;


    // @OneToMany(() => Course, course => course.language)
    // courses: Course[];
}