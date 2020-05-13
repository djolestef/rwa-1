import {from, Observable} from 'rxjs';
import Medicine from '../Models/Medicine';
import DrawMedicines from '../draw/drawMedicines';

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

  public fetchMedicineById(id: number): Observable<any> {
    return from(
      fetch(API_URL + id)
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

  public addNewMedicine(): void {
    var medicine: Medicine = new Medicine();
    var nameInput: HTMLInputElement = document.createElement('input');
    nameInput = document.getElementById('nameInput') as HTMLInputElement;
    medicine.name = nameInput.value;

    var prescriptionInput: HTMLInputElement = document.createElement('input');
    prescriptionInput = document.querySelector(
      'input[name="radioButton"]:checked'
    );
    medicine.needsPrescription = prescriptionInput.value == 'true';

    var countInput: HTMLInputElement = document.createElement('input');
    countInput = document.getElementById('countInput') as HTMLInputElement;
    medicine.count = parseInt(countInput.value);

    fetch(API_URL, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: medicine.name,
        needsPrescription: medicine.needsPrescription,
        count: medicine.count,
      }),
    }).then(() => {
      var drawMedicines: DrawMedicines = new DrawMedicines();
      drawMedicines.draw();
    });
  }

  public deleteMedicine(id) {
    fetch(`${API_URL}${id}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      var drawMedicines: DrawMedicines = new DrawMedicines();
      drawMedicines.draw();
    });
  }

  public updateMedicine(id: number) {
    var medicine: Medicine = new Medicine();
    var nameInput: HTMLInputElement = document.createElement('input');
    nameInput = document.getElementById('nameInput') as HTMLInputElement;
    medicine.name = nameInput.value;

    var prescriptionInput: HTMLInputElement = document.createElement('input');
    prescriptionInput = document.querySelector(
      'input[name="radioButton"]:checked'
    );
    medicine.needsPrescription = prescriptionInput.value == 'true';

    var countInput: HTMLInputElement = document.createElement('input');
    countInput = document.getElementById('countInput') as HTMLInputElement;
    medicine.count = parseInt(countInput.value);

    fetch(`${API_URL}${id}`, {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: medicine.name,
        needsPrescription: medicine.needsPrescription,
        count: medicine.count,
      }),
    }).then(() => {
      var drawMedicines: DrawMedicines = new DrawMedicines();
      drawMedicines.draw();
    });
  }
}
export default MedicineService;
