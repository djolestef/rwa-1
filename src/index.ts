import Medicine from './Models/Medicine';
import Pharmacist from './Models/Pharmacist';
import Customer from './Models/Customer';
import CustomerService from './services/customer.service';
import {from, interval, Observable, fromEvent} from 'rxjs';
import {take, map} from 'rxjs/operators';
import PharmacistService from './services/pharmacist.service';
import DrawResponse from './draw/drawResponse';
import DrawMedicines from './draw/drawMedicines';
import DrawAddNewMedicine from './draw/drawAddNewMedicine';
import MedicineService from './services/medicine.service';
import DrawTest from './draw/drawAddOrEditForm';
import DrawAddOrEditForm from './draw/drawAddOrEditForm';

const pharmacistService = new PharmacistService();
const customerService = new CustomerService();
const drawResponse = new DrawResponse();
const drawMedicines = new DrawMedicines();
const drawAddNewMedicine = new DrawAddNewMedicine();
const medicineService = new MedicineService();
const drawAddOrEditForm: DrawAddOrEditForm = new DrawAddOrEditForm();

const customer = new Customer(1, ['aa', 'bb'], [true, false]);
var i: number = 0;

// console.log(customer);
// drawMedicines.draw();
// drawAddNewMedicine.draw();

var addNewMedicineHyperlink: HTMLElement = document.getElementById(
  'addNewMedicineButton'
) as HTMLElement;

fromEvent(addNewMedicineHyperlink, 'click').subscribe(() => {
  drawAddNewMedicine.draw();
});

var viewAllMedicinesButton: HTMLButtonElement = document.getElementById(
  'viewAllMedicinesButton'
) as HTMLButtonElement;

fromEvent(viewAllMedicinesButton, 'click').subscribe(() => {
  drawMedicines.draw();
});

var startSimulationButton: HTMLButtonElement = document.getElementById(
  'startSimulationButton'
) as HTMLButtonElement;

fromEvent(startSimulationButton, 'click').subscribe(() => {
  var container: HTMLDivElement = document.getElementById(
    'startDiv'
  ) as HTMLDivElement;

  container.innerHTML = '';
  interval(1000)
    .pipe(
      map(() => {
        return from(customerService.fetchRandomCustomer());
      }),
      take(3)
    )
    .subscribe((obs) =>
      obs.subscribe((customer: Customer) => {
        pharmacistService.startWorkWithCustomer(customer);
        setTimeout(() => {
          drawResponse.draw(
            pharmacistService.canHaveMedicine,
            pharmacistService.mustHavePrescription,
            pharmacistService.doesntHave
          );
        }, 250);
      })
    );
});

// interval(1000)
//   .pipe(
//     map(() => {
//       return from(customerService.fetchRandomCustomer());
//     }),
//     take(3)
//   )
//   .subscribe((obs) =>
//     obs.subscribe((customer: Customer) => {
//       pharmacistService.startWorkWithCustomer(customer);
//       setTimeout(() => {
//         drawResponse.draw(
//           pharmacistService.canHaveMedicine,
//           pharmacistService.mustHavePrescription,
//           pharmacistService.doesntHave
//         );
//       }, 250);
//     })
//   );

// var medicine = new Medicine();
// medicine.name = 'Djole';

// var container: HTMLDivElement = document.getElementById(
//   'startDiv'
// ) as HTMLDivElement;

// let drawTest: DrawTest = new DrawTest();

// let content = drawTest.draw(medicine);
// container.innerHTML = content;

// medicineService.addNewMedicine();
// console.log(document.getElementById('nameInput').value);
