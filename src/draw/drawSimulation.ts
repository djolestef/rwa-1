import {from, interval, fromEvent, merge, Observable} from 'rxjs';
import {take, map, takeUntil, switchMap} from 'rxjs/operators';
import PharmacistService from '../services/pharmacist.service';
import CustomerService from '../services/customer.service';
import DrawResponse from './drawResponse';
import Customer from '../Models/Customer';
import Pharmacist from '../Models/Pharmacist';

const numberOfCustomers = 5;

class DrawSimulation {
  public work: Observable<any>;
  private pharmacistService: PharmacistService;
  private customerService: CustomerService;
  private drawResponse: DrawResponse;
  private counter: number;

  constructor() {
    this.pharmacistService = new PharmacistService();
    this.customerService = new CustomerService();
    this.drawResponse = new DrawResponse();
    this.counter = 0;
  }

  public draw(): void {
    var container: HTMLDivElement = document.getElementById(
      'startDiv'
    ) as HTMLDivElement;

    container.innerHTML = '';
    container.innerHTML = this.drawInit();

    var startSimulationButton: HTMLButtonElement = document.getElementById(
      'startSimulationButton'
    ) as HTMLButtonElement;

    this.pharmacistService
      .fetchAllPharmacists()
      .subscribe((pharmacists: Array<Pharmacist>) => {
        startSimulationButton.addEventListener('click', (event: Event) => {
          this.start(pharmacists[0]);
        });
      });
  }

  public start(pharmacist: Pharmacist): void {
    this.counter = 0;
    var container: HTMLDivElement = document.getElementById(
      'simulationDiv'
    ) as HTMLDivElement;

    var response: HTMLDivElement = document.getElementById(
      'response'
    ) as HTMLDivElement;

    response.innerHTML = '';

    let switchButton: HTMLButtonElement = document.getElementById(
      'switchButton'
    ) as HTMLButtonElement;
    switchButton.removeAttribute('hidden');
    let newButton: Node = switchButton.cloneNode(true);

    newButton.addEventListener('click', (event: Event) => {
      setTimeout(() => {
        this.pharmacistService
          .fetchAllPharmacists()
          .subscribe((pharmacists: Array<Pharmacist>) => {
            let nexPharmacists = pharmacists.filter(
              (p) => p.id != pharmacist.id
            );
            this.start(nexPharmacists[0]);
          });
      }, 250);
    });

    const parentNode = document.getElementById('simulationInfo');
    parentNode.replaceChild(newButton, switchButton);

    interval(1000)
      .pipe(
        map(() => {
          return from(this.customerService.fetchRandomCustomer());
        }),
        take(numberOfCustomers),
        takeUntil(fromEvent(newButton, 'click'))
      )
      .subscribe((obs) =>
        obs.subscribe((customer: Customer) => {
          this.pharmacistService.startWorkWithCustomer(customer);
          setTimeout(() => {
            this.drawActivePharmacist(pharmacist);
            this.drawCustomersMedicines(customer.medicines);
            this.drawResponse.draw(
              this.pharmacistService.canHaveMedicine,
              this.pharmacistService.mustHavePrescription,
              this.pharmacistService.doesntHave,
              response
            );
            this.counter++;
            console.log(this.counter, numberOfCustomers);
            if (this.counter == numberOfCustomers) {
              this.pharmacistService
                .fetchAllPharmacists()
                .subscribe((pharmacists: Array<Pharmacist>) => {
                  let nexPharmacists = pharmacists.filter(
                    (p) => p.id != pharmacist.id
                  );
                  this.start(nexPharmacists[0]);
                });
            }
          }, 250);
        })
      );
  }

  private drawInit(): string {
    return `
    <div role="main" class="container" id="simulationInfo">
    <h1 class="mt-5">Simulacija</h1>
    <p class="lead">
      Simulacija funkcioniše tako što u apoteku dođe nasumično generisan kupac sa
      listom lekova koje želi da kupi lek. Apoketar proverarava da li imaju traženi
      lek u apoteci, ako imaju proverarava da li je za taj lek potreban recept. U
      slučaju da nije potreban obaveštava kupca da može da mu proda lek, u
      suprotnom, pita kupca da li ima recept i daje mu obaveštenje na osnovu
      njegovog odgovora. <br />
      Radnici se menjaju nakon 20 usluženih kupaca ili na dugme "Zameni", ukoliko
      je nekom radniku neophodna prevremena pauza.
    </p>
    <p class="lead">
      Obaveštenje može da bude tipa: <br />
      1) Možete dobiti lek1, lek2..<br />
      2) Morate imati recept za lek1, lek2..<br />
      3) Trenutno nemamo lek1, lek2..
    </p>
    <button id="startSimulationButton" class="btn btn-lg btn-primary">Započni Simulaciju</button>
    <button id="switchButton" class="btn btn-lg btn-warning" hidden> Zameni radnika </button>
    <div id="simulationDiv">
    <div id="pharmacistDiv" ></div>
    <div id="customersMedicinesDiv"></div>
    <div id="responseDiv">
    <div id="response"></div>
    </div>
    </div>
  </div>`;
  }

  private drawCustomersMedicines(medicines: Array<String>): void {
    let medicinesToDraw: string = '';

    medicines.map((medicine) => {
      if (medicinesToDraw) {
        medicinesToDraw += ', ';
      }
      medicinesToDraw += medicine;
    });

    let innerHTML: string = `<p class="lead">
    Lekovi koji su potrebni kupcu: <br />
    ${medicinesToDraw}
    </p>`;

    let customersMedicinesDiv: HTMLDivElement = document.getElementById(
      'customersMedicinesDiv'
    ) as HTMLDivElement;

    customersMedicinesDiv.innerHTML = '';
    customersMedicinesDiv.innerHTML = innerHTML;
  }

  private drawActivePharmacist(pharmacist: Pharmacist): void {
    var container: HTMLDivElement = document.getElementById(
      'pharmacistDiv'
    ) as HTMLDivElement;

    container.innerHTML = '';

    container.innerHTML = `<p class="lead">Aktivan radnik: ${pharmacist.name}<br /></p>`;
  }
}
export default DrawSimulation;
