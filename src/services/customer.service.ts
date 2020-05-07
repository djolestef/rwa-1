import {from, Observable} from 'rxjs';
import Customer from '../Models/Customer';

const API_URL = 'http://localhost:3000/customers/';

class CustomerService {
  public fetchAllCustomers(): Observable<any> {
    return from(
      fetch(API_URL)
        .then((response: Response) => {
          if (!response.ok) {
            throw new Error('Database not found');
          } else {
            return response.json().then;
          }
        })
        .catch((err) => console.log(`Error `, err))
    );
  }

  public fetchCustomerById(id: number): Observable<any> {
    return from(
      fetch(API_URL + '?id=' + id)
        .then((response: Response) => {
          if (!response.ok) {
            throw new Error('Customer not found');
          } else {
            return response.json();
          }
        })
        .catch((err) => console.log(`Error `, err))
    );
  }

  public fetchRandomCustomer(): Observable<any> {
    var randomCustomerId: number = Math.floor(Math.random() * 3 + 1);
    // var randomCustomerId = 3;
    return from(
      this.fetchCustomerById(randomCustomerId)
        .toPromise()
        .then((customer: Customer) => {
          var customer: Customer = new Customer(
            customer[0].id,
            customer[0].medicines,
            customer[0].hasPrescription
          );
          return customer;
        })
    );
  }
}
export default CustomerService;
