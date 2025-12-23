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
    // Buscar tarifarios existentes del mismo servicio
    const existingRates = await this.rateRepository.find({
      where: { service: { id: createRateDto.serviceId } },
    });

    // Verificar overlap de fechas
    const newStart = new Date(createRateDto.startDate);
    const newEnd = new Date(createRateDto.endDate);

    for (const rate of existingRates) {
      const existingStart = new Date(rate.startDate);
      const existingEnd = new Date(rate.endDate);

      // Hay overlap si: newStart <= existingEnd AND newEnd >= existingStart
      if (newStart <= existingEnd && newEnd >= existingStart) {
        throw new BadRequestException('Ya existe un tarifario con fechas que se solapan');
      }
    }

    // Crear la entidad con la relación
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

  async update(id: number, updateRateDto: UpdateRateDto) {
    // Extraer serviceId del DTO
    const { serviceId, ...rest } = updateRateDto;
    
    // Si viene serviceId, construir el objeto con la relación
    const updateData: any = { ...rest };
    if (serviceId) {
      updateData.service = { id: serviceId };
    }
    
    // Buscar el rate existente
    const rate = await this.rateRepository.findOne({ where: { id } });
    if (!rate) {
      throw new BadRequestException('Tarifario no encontrado');
    }
    
    // Mezclar datos existentes con nuevos
    Object.assign(rate, updateData);
    
    // Guardar
    return this.rateRepository.save(rate);
  }

  remove(id: number) {
    return this.rateRepository.delete(id);
  }
}