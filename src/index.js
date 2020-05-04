import {
  fetchAllMedicines,
  fetchMedicineByName,
} from './services/medicine.services';
import {Medicine} from './Models/Medicine';
import {Pharmacist} from './Models/Pharmacist';
import {Customer} from './Models/Customer';

// const medicines = fetchAllMedicines ().then (test => {
//   test.subscribe (x => console.log (x, test, medicines));
// });

// fetchAllMedicines ().subscribe (x => {
//   console.log (x);
// });

var customer1 = new Customer (1, 'andol', false);
var customer2 = new Customer (2, 'bruen', false);
var customer3 = new Customer (3, 'fervex', true);

var pharmacist = new Pharmacist (1, true, [customer1, customer2, customer3]);

var medicine;
pharmacist.startWork ();

// medicine = fetchMedicineByName ('andol').subscribe (x => {
//   medicine = x[0];
//   console.log (medicine);
// });

// RxJS v6+
import {delay} from 'rxjs/operators';
import {of, zip} from 'rxjs';

const sourceOne = of ('Hello');
const sourceTwo = of ('World!');
const sourceThree = of ('Goodbye');
const sourceFour = of ('World!');
//wait until all observables have emitted a value then emit all as an array
const example = zip (
  sourceOne,
  sourceTwo.pipe (delay (1000)),
  sourceThree.pipe (delay (2000)),
  sourceFour.pipe (delay (3000))
);
//output: ["Hello", "World!", "Goodbye", "World!"]
//const subscribe = example.subscribe (val => console.log (val));
