import { TRIP_STATUS } from './trip.enum';

export class Trip {
  trip_id: string;

  passenger_id: string;

  starting_from: string;

  final_destination: string;

  trip_status: TRIP_STATUS;
}
