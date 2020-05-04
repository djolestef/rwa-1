import {fetchMedicineByName} from '../services/medicine.services';
import {fromEvent, from, zip, pipe, of} from 'rxjs';
import {
  fetchCustomerById,
  fetchAllCustomers,
} from '../services/customer.services';

export class Pharmacist {
  constructor (id, isAvailable, customersToServe) {
    this.id = id;
    this.isAvailable = isAvailable;
    this.customersToServe = fetchAllCustomers ().toPromise ();
  }

  startWork () {
    this.customersToServe.then (customers => {
      customers.map (customer => {
        const obser = zip (
          this.checkIfPharmacyHasMedicine (customer.medicine),
          this.checkIfMedicineNeedsPrescription (customer.medicine),
          this.checkIfCustomerHasPrescription (customer)
        );
        obser.subscribe (result => {
          if (!result[0]) {
            console.log ('Nema trazenog leka u ponudi');
          } else {
            if (result[1]) {
              if (!result[2]) {
                console.log ('Morate imati recept za trazeni lek');
              }
            } else {
              console.log ('Mozete dobiti lek');
            }
          }
        });
      });
    });
  }

  checkIfPharmacyHasMedicine (medicine) {
    return from (
      fetchMedicineByName (medicine).toPromise ().then (medicine => {
        if (medicine[0]) return true;
        else return false;
      })
    );
  }
  checkIfMedicineNeedsPrescription (medicine) {
    return from (
      fetchMedicineByName (medicine).toPromise ().then (medicine => {
        if (!medicine[0]) return false;
        else return medicine[0].needsPrescription;
      })
    );
  }

  checkIfCustomerHasPrescription (customer) {
    return from (
      fetchCustomerById (customer.id).toPromise ().then (customer => {
        return customer[0].hasPrescription;
      })
    );
  }
}
