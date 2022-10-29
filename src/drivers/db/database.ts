import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import { Driver } from '../entities/driver.entity';

@Injectable()
export class DriversDatabase {
  private FILENAME = 'drivers.json';

  public async saveData(data: Driver) {
    const content = JSON.parse(await readFile(this.FILENAME, 'utf-8'));

    const updatedContent = [...content, data];

    writeFile(this.FILENAME, JSON.stringify(updatedContent));

    return data;
  }
  public async loadData() {
    const content: Driver[] = JSON.parse(
      await readFile(this.FILENAME, 'utf-8'),
    );

    return content;
  }

  public async rewriteData(data: Driver[]) {
    await writeFile(this.FILENAME, JSON.stringify(data));
  }
}
