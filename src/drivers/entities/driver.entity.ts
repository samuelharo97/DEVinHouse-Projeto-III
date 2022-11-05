import { Trip } from 'src/trips/entities/trip.entity';
import { CarModel } from './car-model.enum';
import { Address } from './driver-address';

export class Driver {
  name: string;

  birth_date: Date;

  cpf: string;

  car_plate: string;

  car_model: CarModel;

  location: Address;

  blocked?: boolean;

  completed_trips?: Trip[];
}
