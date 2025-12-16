import {Entity,Column,PrimaryGeneratedColumn, OneToMany, CreateDateColumn} from 'typeorm';
import { Service } from 'src/services/entities/service.entity';

@Entity()
export class Provider{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    contactEmail: string;

    @Column({length: 10})
    phone: string;

    @Column({default: true})
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Service, (service) => service.provider)
    services: Service[];

}