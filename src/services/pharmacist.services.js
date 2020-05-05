import {fromEvent, from, zip, pipe, of, interval, merge} from 'rxjs';
import {buffer, take, map, takeLast} from 'rxjs/operators';
import {
  fetchCustomerById,
  fetchAllCustomers,
} from '../services/customer.services';
import {fetchMedicineByName, fetchAllMedicines} from './medicine.services';

// export function startWorkWithCustomer() {
//   fetchAllCustomers()
//     .toPromise()
//     .then((customers) => {
//       customers.map((customer) => {
//         zip(
//           checkIfPharmacyHasMedicine(customer.medicine),
//           checkIfMedicineNeedsPrescription(customer.medicine),
//           checkIfCustomerHasPrescription(customer)
//         ).subscribe((result) => {
//           informCustomerIfHeCanGetMedicine(result);
//         });
//       });
//     });
// }

export function startWorkWithCustomer(customer) {
  zip(
    checkIfPharmacyHasMedicine(customer.medicine),
    checkIfMedicineNeedsPrescription(customer.medicine),
    checkIfCustomerHasPrescription(customer)
  ).subscribe((result) => {
    informCustomerIfHeCanGetMedicine(result);
  });
}

function checkIfPharmacyHasMedicine(medicine) {
  return from(
    fetchMedicineByName(medicine)
      .toPromise()
      .then((medicine) => {
        if (medicine[0]) return true;
        else return false;
      })
  );
}
function checkIfMedicineNeedsPrescription(medicine) {
  return from(
    fetchMedicineByName(medicine)
      .toPromise()
      .then((medicine) => {
        if (!medicine[0]) return false;
        else return medicine[0].needsPrescription;
      })
  );
}

function checkIfCustomerHasPrescription(customer) {
  return from(
    fetchCustomerById(customer.id)
      .toPromise()
      .then((customer) => {
        return customer[0].hasPrescription;
      })
  );
}

function informCustomerIfHeCanGetMedicine(result) {
  if (!result[0]) {
    console.log('Nema trazenog leka u ponudi');
  } else {
    if (result[1]) {
      if (!result[2]) {
        console.log('Morate imati recept za trazeni lek');
      }
    } else {
      console.log('Mozete dobiti lek');
    }
  }
}

export function switchPharmacist() {}
