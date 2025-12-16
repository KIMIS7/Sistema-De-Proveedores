import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const service = this.serviceRepository.create({
      ...createServiceDto,
      provider: { id: createServiceDto.providerId },
    });
    return this.serviceRepository.save(service);
  }

  findAll() {
    return this.serviceRepository.find({ relations: ['provider', 'rates'] });
  }

  findOne(id: number) {
    return this.serviceRepository.findOne({ where: { id }, relations: ['provider', 'rates'] });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.serviceRepository.update(id, updateServiceDto);
  }

  async remove(id: number) {
    const service = await this.serviceRepository.findOne({
      where: { id },
      relations: ['rates'],
    });

    if ((service?.rates?.length ?? 0) > 0) {
      throw new BadRequestException('No se puede eliminar un servicio con tarifarios asociados');
    }

    return this.serviceRepository.delete(id);
  }
}