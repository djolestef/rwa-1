import {fromEvent, from} from 'rxjs';
import {debounceTime, map, filter, switchMap, catchError} from 'rxjs/operators';

const API_URL = 'http://localhost:3000/medicines/';

export function fetchAllMedicines () {
  return from (
    fetch (API_URL)
      .then (response => {
        if (!response.ok) {
          throw new Error ('Database not found');
        } else {
          return response.json ();
        }
      })
      .catch (err => console.log (`Error `, err))
  );
}

export function fetchMedicineByName (name) {
  return from (
    fetch (API_URL + '?name=' + name)
      .then (response => {
        if (!response.ok) {
          throw new Error ('Medicine not found');
        } else {
          return response.json ();
        }
      })
      .catch (err => console.log (`Error `, err))
  );
}
