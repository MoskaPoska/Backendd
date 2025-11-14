import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('user_stats')
export class UserStat {
    @PrimaryGeneratedColumn()
    id: number;

    //@OneToOne(() => User, user => user.stat)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'user_id', unique: true })
    userId: number;

    @Column({ type: 'int', default: 0 })
    grammar_xp: number;

    @Column({ type: 'int', default: 0 })
    vocabulary_xp: number;

    @Column({ type: 'int', default: 0 })
    writing_xp: number;

    @Column({ type: 'int', default: 0 })
    speaking_xp: number;

    @Column({ type: 'int', default: 0 })
    listening_xp: number;

    @Column({ type: 'int', default: 1 })
    level: number;


    @Column({ type: 'int', default: 0 })
    total_xp: number;
}