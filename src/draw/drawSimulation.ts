import {from, interval, fromEvent, merge, Observable, Subscription} from 'rxjs';
import {take, map, takeUntil} from 'rxjs/operators';
import PharmacistService from '../services/pharmacist.service';
import CustomerService from '../services/customer.service';
import DrawResponse from './drawResponse';
import Customer from '../Models/Customer';
import Pharmacist from '../Models/Pharmacist';
import Medicine from '../Models/Medicine';

const numberOfCustomers: number = 10;
const customersInterval: number = 5000;

class DrawSimulation {
  public work: Observable<any>;
  private pharmacistService: PharmacistService;
  private customerService: CustomerService;
  private drawResponse: DrawResponse;
  private counter: number;
  private responseCounter: number;
  private timer: Observable<number>;

  constructor() {
    this.pharmacistService = new PharmacistService();
    this.customerService = new CustomerService();
    this.drawResponse = new DrawResponse();
    this.counter = 0;
    this.responseCounter = 0;
    this.timer;
  }

  public draw(): void {
    let container: HTMLDivElement = document.getElementById(
      'startDiv'
    ) as HTMLDivElement;

    container.innerHTML = '';
    container.innerHTML = this.drawInit();

    let startSimulationButton: HTMLButtonElement = document.getElementById(
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

    let infoLabel: HTMLLabelElement = document.getElementById(
      'infoLabel'
    ) as HTMLLabelElement;

    let response: HTMLDivElement = document.getElementById(
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
              (p: Pharmacist) => p.id != pharmacist.id
            );
            merged.unsubscribe();
            this.start(nexPharmacists[0]);
          });
      }, 250);
    });

    const parentNode = document.getElementById('simulationInfo');
    parentNode.replaceChild(newButton, switchButton);

    this.timer = interval(customersInterval * numberOfCustomers);
    const click: Observable<Event> = fromEvent(newButton, 'click');
    let merged: Subscription = merge(click, this.timer).subscribe(
      (x: number) => {
        if (x == 0) {
          infoLabel.innerHTML = 'Radnica je uslužila 10 kupaca.';
        } else {
          infoLabel.innerHTML = 'Radnica je zatražila pauzu.';
        }
      }
    );
    interval(customersInterval)
      .pipe(
        map(() => {
          return from(this.customerService.fetchRandomCustomer());
        }),
        take(numberOfCustomers),
        takeUntil(fromEvent(newButton, 'click'))
      )
      .subscribe((obs: Observable<any>) =>
        obs.subscribe((customer: Customer) => {
          this.pharmacistService.startWorkWithCustomer(customer);
          setTimeout(() => {
            this.drawActivePharmacist(pharmacist);
            this.drawCustomersMedicines(customer.medicines);
            if (this.responseCounter == 4) {
              response.innerHTML = '';
              this.responseCounter = 0;
            }
            this.drawResponse.draw(
              this.pharmacistService.canHaveMedicine,
              this.pharmacistService.mustHavePrescription,
              this.pharmacistService.doesntHave,
              response
            );
            this.responseCounter++;
            this.counter++;
            if (this.counter == numberOfCustomers) {
              this.pharmacistService
                .fetchAllPharmacists()
                .subscribe((pharmacists: Array<Pharmacist>) => {
                  let nexPharmacists = pharmacists.filter(
                    (p: Pharmacist) => p.id != pharmacist.id
                  );
                  merged.unsubscribe();
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
      Radnici se menjaju nakon 10 usluženih kupaca ili na dugme "Zameni", ukoliko
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
    <label id="infoLabel" class="lead"></label>
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
    let container: HTMLDivElement = document.getElementById(
      'pharmacistDiv'
    ) as HTMLDivElement;

    container.innerHTML = '';

    container.innerHTML = `<p class="lead">Aktivan radnik: ${pharmacist.name}<br /></p>`;
  }
}
export default DrawSimulation;
