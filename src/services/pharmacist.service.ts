import {from, zip, Observable} from 'rxjs';
import MedicineService from './medicine.service';
import Customer from '../Models/Customer';
import Medicine from '../Models/Medicine';

class PharmacistService {
  private medicineService: MedicineService;

  constructor() {
    this.medicineService = new MedicineService();
  }

  public startWorkWithCustomer(customer: Customer): void {
    customer.medicines.map((medicineName: string, i: number) => {
      this.checkIfCustomerCanGetMedicine(
        medicineName,
        customer.hasPrescription[i]
      );
    });
  }

  private checkIfCustomerCanGetMedicine(
    medicineName: string,
    hasPrescription: boolean
  ): void {
    zip(
      this.checkIfPharmacyHasMedicine(medicineName),
      this.checkIfMedicineNeedsPrescription(medicineName)
    ).subscribe((result: Array<boolean>) => {
      result[2] = hasPrescription;
      this.informCustomerIfHeCanGetMedicine(result, medicineName);
    });
  }

  private checkIfPharmacyHasMedicine(medicineName: string): Observable<any> {
    return from(
      this.medicineService
        .fetchMedicineByName(medicineName)
        .toPromise()
        .then((medicine: Array<Medicine>) => {
          if (medicine[0]) return true;
          else return false;
        })
    );
  }
  private checkIfMedicineNeedsPrescription(
    medicineName: string
  ): Observable<any> {
    return from(
      this.medicineService
        .fetchMedicineByName(medicineName)
        .toPromise()
        .then((medicine: Array<Medicine>) => {
          if (!medicine[0]) return false;
          else return medicine[0].needsPrescription;
        })
    );
  }

  private informCustomerIfHeCanGetMedicine(
    result: Array<boolean>,
    medicineName: string
  ): void {
    if (!result[0]) {
      console.log('Lek ' + medicineName + ' nemamo u ponudi');
    } else {
      if (result[1]) {
        if (!result[1] || (result[1] && result[2])) {
          console.log('Za ' + medicineName + ' morate imati recept');
        } else {
          console.log(' Mozete dobiti ' + medicineName);
        }
      }
    }
  }
}
export default PharmacistService;
