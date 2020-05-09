import {from, zip, Observable, interval} from 'rxjs';
import {take} from 'rxjs/operators';
import MedicineService from './medicine.service';
import Customer from '../Models/Customer';
import Medicine from '../Models/Medicine';

class PharmacistService {
  private medicineService: MedicineService;
  public canHaveMedicine: string;
  public mustHavePrescription: string;
  public doesntHave: string;

  constructor() {
    this.medicineService = new MedicineService();
    this.canHaveMedicine = '';
    this.mustHavePrescription = '';
    this.doesntHave = '';
  }

  public startWorkWithCustomer(customer: Customer): void {
    setTimeout(() => {
      this.resetMessages();
    }, 5);
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
      this.doesntHave = !this.doesntHave
        ? this.doesntHave
        : this.doesntHave + ', ';
      this.doesntHave += `${medicineName}`;
      return;
    }

    if (result[1] && !result[2]) {
      this.mustHavePrescription = !this.mustHavePrescription
        ? this.mustHavePrescription
        : this.mustHavePrescription + ', ';
      this.mustHavePrescription += `${medicineName}`;
      return;
    }

    this.canHaveMedicine = !this.canHaveMedicine
      ? this.canHaveMedicine
      : this.canHaveMedicine + ', ';
    this.canHaveMedicine += `${medicineName}`;
  }

  public resetMessages(): void {
    this.canHaveMedicine = '';
    this.mustHavePrescription = '';
    this.doesntHave = '';
  }
}

export default PharmacistService;
