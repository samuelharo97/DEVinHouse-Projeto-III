import { Address } from './trip-address';
import { TRIP_STATUS } from './trip.enum';

export class Trip {
  trip_id?: string;

  passenger_id?: string;

  starting_from?: Address;

  final_destination?: Address;

  trip_status?: TRIP_STATUS;

  created_at?: string;

  duration?: string;

  distance?: string;

  price?: string;
}
