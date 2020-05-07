import {from, Observable} from 'rxjs';
import Medicine from '../Models/Medicine';
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

  // public addNewMedicine() {
  //   var medicine:Medicine = new Medicine();
  //   medicine.name = document.getElementById('nameInput').value ;
  //   medicine.needsPrescription = document.getElementById()

  //   fetch(API_URL, {
  //     method: 'post',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name:
  //     })
  //   });
  // }
}
export default MedicineService;
