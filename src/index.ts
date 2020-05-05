import Medicine from './Models/Medicine';
import Pharmacist from './Models/Pharmacist';
import Customer from './Models/Customer';
import CustomerService from './services/customer.service';
import {from, interval, Observable} from 'rxjs';
import {take, map} from 'rxjs/operators';
import PharmacistService from './services/pharmacist.service';

const pharmacistService = new PharmacistService();
const customerService = new CustomerService();

const customer = new Customer(1, ['aa', 'bb'], [true, false]);

// console.log(customer);

interval(1000)
  .pipe(
    map(() => {
      return from(customerService.fetchRandomCustomer());
    }),
    take(3)
  )
  .subscribe((obs) =>
    obs.subscribe((customer) => {
      pharmacistService.startWorkWithCustomer(customer);
    })
  );

customerService.fetchAllCustomers();
