import { Address } from './passenger-address';

export class Passenger {
  name: string;

  birth_date: Date;

  cpf: string;

  address: Address;

  blocked?: boolean;

  ordered_trips?: string[];
}
