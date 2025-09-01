import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PasswordReset {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    token: string;

    @Column()
    expires_at: Date;

    @ManyToOne(() => User, user => user.passwordResets)
    @JoinColumn({ name: 'user_id' })
    user: User;
}