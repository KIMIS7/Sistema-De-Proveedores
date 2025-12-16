import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './entities/provider.entity';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository.save(createProviderDto);
  }

  findAll() {
    return this.providerRepository.find({ relations: ['services'] });
  }

  findOne(id: number) {
    return this.providerRepository.findOne({ where: { id }, relations: ['services'] });
  }

  update(id: number, updateProviderDto: UpdateProviderDto) {
    return this.providerRepository.update(id, updateProviderDto);
  }

  async remove(id: number) {
    const provider = await this.providerRepository.findOne({
      where: { id },
      relations: ['services'],
    });

    if (provider?.services && provider.services.length > 0) {
  throw new BadRequestException('No se puede eliminar un proveedor con servicios asociados');
  }

    return this.providerRepository.delete(id);
  }
}