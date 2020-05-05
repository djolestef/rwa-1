import {fromEvent, from} from 'rxjs';

const API_URL = 'http://localhost:3000/customers/';

export function fetchAllCustomers() {
  return from(
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Database not found');
        } else {
          return response.json();
        }
      })
      .catch((err) => console.log(`Error `, err))
  );
}

export function fetchCustomerById(id) {
  return from(
    fetch(API_URL + '?id=' + id)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Customer not found');
        } else {
          return response.json();
        }
      })
      .catch((err) => console.log(`Error `, err))
  );
}

export function fetchRandomCustomer() {
  var randomCustomerId = Math.floor(Math.random() * 3 + 1);

  return from(
    fetchCustomerById(randomCustomerId)
      .toPromise()
      .then((customer) => {
        return customer;
      })
  );
}
