import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import { Trip } from 'src/trips/entities/trip.entity';
import { User } from 'src/users/entities/user.entity';
import { Driver } from '../drivers/entities/driver.entity';

@Injectable()
export class Database {
  public DRIVERS_FILE = 'src/db/drivers.json';
  public USERS_FILE = 'src/db/users.json';
  public TRIPS_FILE = 'src/db/trips.json';

  public async saveData(data: Driver | User | Trip, fileName: string) {
    const content = JSON.parse(await readFile(fileName, 'utf-8'));

    const updatedContent = [...content, data];

    writeFile(fileName, JSON.stringify(updatedContent));

    return data;
  }
  public async loadData(fileName: string) {
    const content: Driver[] = JSON.parse(await readFile(fileName, 'utf-8'));

    return content;
  }

  public async rewriteData(data: Driver[] | User[] | Trip[], fileName: string) {
    await writeFile(fileName, JSON.stringify(data));
  }
}
