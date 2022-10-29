import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import { User } from '../entities/user.entity';

@Injectable()
export class Database {
  private FILENAME = 'users.json';

  public async saveData(data: User) {
    const content = JSON.parse(await readFile(this.FILENAME, 'utf-8'));

    const updatedContent = [...content, data];

    writeFile(this.FILENAME, JSON.stringify(updatedContent));

    return data;
  }
  public async loadData() {
    const content = JSON.parse(await readFile(this.FILENAME, 'utf-8'));

    return content;
  }

  public async rewriteData(data: User[]) {
    await writeFile(this.FILENAME, JSON.stringify(data));
  }
}
