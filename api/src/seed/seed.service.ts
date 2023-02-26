import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    const logger = new Logger('Bootstrap');

    const admin = this.userRepository.create({
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('A1b2c3', 10),
      roles: ['admin', 'chofer', 'user'],
      name: 'Jairo',
      last_name: 'Martinez',
      second_last_name: 'Portillo',
      phone: '+52 951 4268601',
      address: 'Av. siempre viva, Colonia Benito Camela, No 666, CP. 801',
      birth_date: '01-08-2001',
      id_card: 'asdasdasd',
    });

    const user = await this.userRepository.findOne({
      where: { email: admin.email },
    });

    if (user) throw new ForbiddenException();

    await this.userRepository.save(admin);

    logger.log('Seed executed');
    return { message: 'Seed executed' };
  }
}
