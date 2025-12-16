import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import { Provider } from '../../providers/entities/provider.entity';
import { Rate } from 'src/rates/entities/rate.entity';

@Entity()
export class Service{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({default: true})
    isActive: Boolean;

    @ManyToOne(() => Provider, (provider) => provider.services)
    provider: Provider;

    @OneToMany(() => Rate, (rate) => rate.service)
    rates: Rate[];

}
