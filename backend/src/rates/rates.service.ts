import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rate } from './entities/rate.entity';
import { CreateRateDto } from './dto/create-rate.dto';
import { UpdateRateDto } from './dto/update-rate.dto';

@Injectable()
export class RatesService {
  constructor(
    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,
  ) {}

  async create(createRateDto: CreateRateDto) {
    const existingRates = await this.rateRepository.find({
      where: { service: { id: createRateDto.serviceId } },
    });

    const newStart = new Date(createRateDto.startDate);
    const newEnd = new Date(createRateDto.endDate);

    for (const rate of existingRates) {
      const existingStart = new Date(rate.startDate);
      const existingEnd = new Date(rate.endDate);

      if (newStart <= existingEnd && newEnd >= existingStart) {
        throw new BadRequestException('Ya existe un tarifario con fechas que se solapan');
      }
    }

    const rate = this.rateRepository.create({
      ...createRateDto,
      service: { id: createRateDto.serviceId },
    });
    return this.rateRepository.save(rate);
  }

  findAll() {
    return this.rateRepository.find({ relations: ['service'] });
  }

  findOne(id: number) {
    return this.rateRepository.findOne({ where: { id }, relations: ['service'] });
  }

  update(id: number, updateRateDto: UpdateRateDto) {
    return this.rateRepository.update(id, updateRateDto);
  }

  remove(id: number) {
    return this.rateRepository.delete(id);
  }
}