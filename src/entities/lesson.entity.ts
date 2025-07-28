import {
    Column,
    ColumnTypeUndefinedError,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import{Course} from "./course.entity";
import {Progress} from "./progress.entity";

@Entity("lessons")
export class Lesson
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    column_id: number;

    @Column({type: 'varchar', length:255, nullable: false})
    title: string;

    @Column({type: 'text', nullable: true})
    content: string;

    @Column({type: 'varchar', length:50, default:"text"})
    type: string;

    @Column({type: 'int', nullable: false})
    position: number;

    @ManyToOne(()=> Course, course => course.lessons)
    @JoinColumn({name: "course_id"})
    courses: Course;

    @OneToMany(() => Progress, progress => progress.lesson)
    progresses: Progress[];

}