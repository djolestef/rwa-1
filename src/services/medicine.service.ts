import {from, Observable} from 'rxjs';
const API_URL = 'http://localhost:3000/medicines/';

class MedicineService {
  public fetchAllMedicines(): Observable<any> {
    return from(
      fetch(API_URL)
        .then((response: Response) => {
          if (!response.ok) {
            throw new Error('Database not found');
          } else {
            return response.json();
          }
        })
        .catch((err) => console.log(`Error `, err))
    );
  }

  public fetchMedicineByName(name: string): Observable<any> {
    return from(
      fetch(API_URL + '?name=' + name)
        .then((response: Response) => {
          if (!response.ok) {
            throw new Error('Medicine not found');
          } else {
            return response.json();
          }
        })
        .catch((err) => console.log(`Error `, err))
    );
  }
}
export default MedicineService;
