import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Lesson } from './lesson.entity';

@Entity('progress')
export class Progress {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    user_id: number;

    @Column({ type: 'int', nullable: false })
    lesson_id: number;

    @Column({ type: 'boolean', default: false })
    completed: boolean;

    @Column({ type: 'decimal', precision: 5, scale: 2, default: 0.00 })
    progress_percent: number;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;


    @ManyToOne(() => User, user => user.progresses)
    @JoinColumn({ name: 'user_id' })
    user: User;


    @ManyToOne(() => Lesson, lesson => lesson.progresses)
    @JoinColumn({ name: 'lesson_id' })
    lesson: Lesson;
}