import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import { Driver } from '../drivers/entities/driver.entity';

@Injectable()
export class Database {
  public DRIVERS_FILE = 'src/db/drivers.json';
  public USERS_FILE = 'src/db/users.json';
  public TRIPS_FILE = 'src/db/trips.json';

  public async saveData(data: Driver, fileName: string) {
    const content = JSON.parse(await readFile(fileName, 'utf-8'));

    const updatedContent = [...content, data];

    writeFile(fileName, JSON.stringify(updatedContent));

    return data;
  }
  public async loadData(fileName: string) {
    const content: Driver[] = JSON.parse(await readFile(fileName, 'utf-8'));

    return content;
  }

  public async rewriteData(data: Driver[], fileName: string) {
    await writeFile(fileName, JSON.stringify(data));
  }
}
