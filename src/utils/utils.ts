import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class Utils {
  public cleanCpf(cpf: string) {
    const removeHyphen = cpf.replace('-', '');
    const updatedCpf = removeHyphen.replaceAll('.', '');

    return updatedCpf;
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

    if (myAge < 18) {
      return false;
    } else {
      return true;
    }
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
