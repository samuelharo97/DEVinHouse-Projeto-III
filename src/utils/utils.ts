import { BadRequestException, Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Utils {
  private API_KEY = this.config.get('API_KEY');

  constructor(
    private config: ConfigService,
    private httpService: HttpService,
  ) {}

  public cleanCpf(cpf: string) {
    const removeHyphen = cpf.replace('-', '');
    const updatedCpf = removeHyphen.replaceAll('.', '');
    return updatedCpf;
  }

  //this calculates distance between two points in a straight line - method taken from stack overflow
  public getDistanceFromLatLonInKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  public deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }

  // script taken from stack overflow
  public validateCPF(cpf: string) {
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    )
      return false;
    // Valida 1o digito
    let i: number;
    let add: number;
    let rev: number;
    add = 0;
    for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    // Valida 2o digito
    add = 0;
    for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;
  }

  public async getGoogleData(origin: string, destination: string) {
    const URL = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination},&key=${this.API_KEY}&units=metric`;

    const data = await firstValueFrom(
      this.httpService.get(URL).pipe(map((response) => response.data)),
    );
    return data;
  }

  public underAgeValidate(birthday: string) {
    // script below taken from: https://www.good-codes.com/javascript-calculate-age-from-date-of-birth-js/

    // it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
    const optimizedBirthday = birthday.replace(/-/g, '/');
    //set date based on birthday at 01:00:00 hours GMT+0100 (CET)
    const myBirthday = Number(new Date(optimizedBirthday));

    // calculate age comparing current date and birthday
    const myAge = ~~((Date.now() - myBirthday) / 31557600000);

    if (myAge > 80) {
      throw new BadRequestException({
        message: `driver can't be over 80 years old`,
      });
    }

    if (myAge < 18) {
      return false;
    } else {
      return true;
    }
  }

  public cleanLicensePlates(licensePlate: string) {
    const car_plate = licensePlate.replace('-', '');
    return car_plate;
  }

  // pagination taken from stack overflow - added a few changes
  public paginate(array: any[], page: any, size: any) {
    if (page <= 0) {
      throw new BadRequestException({
        message: `page number can't be less than 1`,
      });
    }

    // transform values

    page = Math.abs(parseInt(page));
    page = page > 0 ? page - 1 : page;
    size = parseInt(size);
    size = size < 1 ? 10 : size;

    if (
      [
        ...array.filter((value, index) => {
          return index >= page * size && index < (page + 1) * size;
        }),
      ].length == 0
    ) {
      throw new BadRequestException({
        statusCode: 400,
        message: `Page ${page + 1} doesn't exist`,
      });
    }

    return [
      ...array.filter((value, index) => {
        return index >= page * size && index < (page + 1) * size;
      }),
    ];
  }
}
