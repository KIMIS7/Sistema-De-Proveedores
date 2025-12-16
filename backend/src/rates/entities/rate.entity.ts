import { Entity,Column,PrimaryGeneratedColumn,OneToMany, ManyToOne } from "typeorm";
import {Service} from '../../services/entities/service.entity';

@Entity()
export class Rate {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', {precision:10 , scale:2})
    price: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    currency: string; //USD O MXN

    @ManyToOne(()=> Service, (service) => service.rates)
    service: Service;

}
