import { Injectable } from '@nestjs/common';

@Injectable()
export class CleanCPF {
  public cleanCpf(cpf: string) {
    const removeHyphen = cpf.replace('-', '');
    const updatedCpf = removeHyphen.replaceAll('.', '');

    return updatedCpf;
  }

  /* public underAgeValidate(birthday) {
    // it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
    const optimizedBirthday = birthday.replace(/-/g, '/');
    //set date based on birthday at 01:00:00 hours GMT+0100 (CET)
    const myBirthday = new Date(optimizedBirthday);

    // set current day on 01:00:00 hours GMT+0100 (CET)
    const currentDate = new Date().toJSON().slice(0, 10) + ' 01:00:00';

    // calculate age comparing current date and birthday
    const myAge = ~~((Date.now(currentDate) - myBirthday) / 31557600000);

    if (myAge < 18) {
      return false;
    } else {
      return true;
    }
  }*/
}
