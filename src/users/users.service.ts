import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { Database } from 'src/db/database';
import { Utils } from 'src/utils/utils';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private database: Database, private util: Utils) {}

  public async create(user: User) {
    user.cpf = this.util.cleanCpf(user.cpf);
    const cpfIsValid = this.util.validateCPF(user.cpf);

    if (!cpfIsValid) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Invalid CPF',
      });
    }

    console.log(cpfIsValid);

    const userExists = await this.getUser(user.cpf);
    if (userExists) {
      throw new ConflictException({
        statusCode: 409,
        message: 'A user with the same CPF is already registered',
      });
    }

    const ageValidation = this.util.underAgeValidate(user.birth_date);

    if (!ageValidation) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'user must be over 18 years old',
      });
    }

    this.database.saveData(user, this.database.USERS_FILE);

    return user;
  }

  public async findAll(
    page: number,
    limit: number,
    name: string,
  ): Promise<User[]> {
    let users: User[] = await this.database.loadData(this.database.USERS_FILE);

    if (name) {
      users = users.filter((user) =>
        user.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()),
      );
    }

    if (page > 0 || limit > 0) {
      return this.util.paginate(users, page, limit);
    }

    return users;
  }

  public async findOne(cpf: string) {
    const users = await this.database.loadData(this.database.USERS_FILE);

    const user = users.find((user: User) => {
      return user.cpf == cpf;
    });

    return user;
  }

  update(cpf: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${cpf} user`;
  }

  remove(cpf: string) {
    return `This action removes a #${cpf} user`;
  }

  public async getUser(cpf: string) {
    const users = await this.database.loadData(this.database.USERS_FILE);
    return users.find((user) => user.cpf == cpf);
  }
}
