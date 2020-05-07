import Medicine from './Models/Medicine';
import Pharmacist from './Models/Pharmacist';
import Customer from './Models/Customer';
import CustomerService from './services/customer.service';
import {from, interval, Observable} from 'rxjs';
import {take, map} from 'rxjs/operators';
import PharmacistService from './services/pharmacist.service';
import DrawResponse from './draw/drawResponse';
import DrawMedicines from './draw/drawMedicines';
import DrawAddNewMedicine from './draw/drawAddNewMedicine';

const pharmacistService = new PharmacistService();
const customerService = new CustomerService();
const drawResponse = new DrawResponse();
const drawMedicines = new DrawMedicines();
const drawAddNewMedicine = new DrawAddNewMedicine();

const customer = new Customer(1, ['aa', 'bb'], [true, false]);
var i: number = 0;

// console.log(customer);
drawMedicines.draw();
drawAddNewMedicine.draw();
console.log(document.getElementById('nameInput').value);

// interval(1000)
//   .pipe(
//     map(() => {
//       return from(customerService.fetchRandomCustomer());
//     }),
//     take(3)
//   )
//   .subscribe((obs) =>
//     obs.subscribe((customer: Customer) => {
//       console.log(
//         pharmacistService.canHaveMedicine,
//         pharmacistService.mustHavePrescription,
//         pharmacistService.doesntHave
//       );
//       pharmacistService.startWorkWithCustomer(customer);
//       drawResponse.draw(
//         pharmacistService.canHaveMedicine,
//         pharmacistService.mustHavePrescription,
//         pharmacistService.doesntHave
//       );
//     })
//   );

// customerService.fetchCustomerById(1).subscribe((x) => {
//   pharmacistService.startWorkWithCustomer(x[0]);
//   draw.drawResponse(
//     pharmacistService.canHaveMedicine,
//     pharmacistService.mustHavePrescription,
//     pharmacistService.doesntHave
//   );
// });

// const startDiv = document.getElementById('startDiv');
// var test = document.createElement('label');
// test.innerHTML = 'djole car';
// startDiv.appendChild(test);
// console.log(startDiv);

// var draw: Draw;
// var draw = new Draw();
// draw.drawResponse('aaa');
