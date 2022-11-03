import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import { Trip } from 'src/trips/entities/trip.entity';
import { Passenger } from 'src/passengers/entities/passenger.entity';
import { Driver } from '../drivers/entities/driver.entity';

@Injectable()
export class Database {
  public DRIVERS_FILE = 'src/db/drivers.json';
  public PASSENGERS_FILE = 'src/db/passenger.json';
  public TRIPS_FILE = 'src/db/trips.json';

  public async saveData(data: Driver | Passenger | Trip, fileName: string) {
    const content = JSON.parse(await readFile(fileName, 'utf-8'));

    const updatedContent = [...content, data];

    writeFile(fileName, JSON.stringify(updatedContent));

    return data;
  }
  public async loadData(fileName: string) {
    const content: any[] = JSON.parse(await readFile(fileName, 'utf-8'));

    return content;
  }

  public async rewriteData(data: any[], fileName: string) {
    await writeFile(fileName, JSON.stringify(data));
  }
}
