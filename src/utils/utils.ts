import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class Utils {
  public cleanCpf(cpf: string) {
    const removeHyphen = cpf.replace('-', '');
    const updatedCpf = removeHyphen.replaceAll('.', '');
    return updatedCpf;
  }

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

  public underAgeValidate(birthday: string) {
    const year = birthday.slice(6, birthday.length);
    const month = birthday.slice(3, 5);
    const day = birthday.slice(0, 2);

    const formatedBirthday = year + '/' + month + '/' + day;

    // script below taken from: https://www.good-codes.com/javascript-calculate-age-from-date-of-birth-js/

    // it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
    const optimizedBirthday = formatedBirthday.replace(/-/g, '/');
    //set date based on birthday at 01:00:00 hours GMT+0100 (CET)
    const myBirthday = Number(new Date(optimizedBirthday));

    // calculate age comparing current date and birthday
    const myAge = ~~((Date.now() - myBirthday) / 31557600000);

    if (myAge > 70) {
      throw new BadRequestException({
        message: `driver can't be over 70 years old`,
      });
    }

    if (myAge < 18) {
      return false;
    } else {
      return true;
    }
  }

  public cleanLicensePlates(licensePlate) {
    const car_plate = licensePlate.replace('-', '');
    return car_plate;
  }

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

    // filter
    return [
      ...array.filter((value, index) => {
        return index >= page * size && index < (page + 1) * size;
      }),
    ];
  }
}
