import {
  from,
  interval,
  fromEvent,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  of,
  OperatorFunction,
} from 'rxjs';
import {take, map, takeUntil, switchMap} from 'rxjs/operators';
import PharmacistService from '../services/pharmacist.service';
import CustomerService from '../services/customer.service';
import DrawResponse from './drawResponse';
import Customer from '../Models/Customer';
import Pharmacist from '../Models/Pharmacist';

class DrawSimulation {
  public work: Observable<any>;
  private pharmacistService: PharmacistService;
  private customerService: CustomerService;
  private drawResponse: DrawResponse;
  //   public flag: Boolean;

  constructor() {
    this.pharmacistService = new PharmacistService();
    this.customerService = new CustomerService();
    this.drawResponse = new DrawResponse();
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
    var container: HTMLDivElement = document.getElementById(
      'simulationDiv'
    ) as HTMLDivElement;

    var response: HTMLDivElement = document.getElementById(
      'response'
    ) as HTMLDivElement;
    container.appendChild(response);

    response.innerHTML = '';

    let testButton: HTMLButtonElement = document.getElementById(
      'testButton'
    ) as HTMLButtonElement;
    testButton.removeAttribute('hidden');
    let newButton = testButton.cloneNode(true);

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
    parentNode.replaceChild(newButton, testButton);

    interval(1000)
      .pipe(
        map(() => {
          return from(this.customerService.fetchRandomCustomer());
        }),
        take(5),
        takeUntil(fromEvent(newButton, 'click'))
      )
      .subscribe((obs) =>
        obs.subscribe((customer: Customer) => {
          console.log(pharmacist.id);
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
    <button id="testButton" class="btn btn-lg btn-warning" hidden> Zameni radnika </button>
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

  // private drawActivePharmacist(pharmacist: Pharmacist): void {
  //   var container: HTMLDivElement = document.getElementById(
  //     'pharmacistDiv'
  //   ) as HTMLDivElement;

  //   container.innerHTML = '';

  //   container.innerHTML = `<p class="lead">Aktivan radnik: ${pharmacist.name}<br /></p>
  //   <button id="switchButton">Zameni</button>`;

  //   let switchButton: HTMLButtonElement = document.getElementById(
  //     'switchButton'
  //   ) as HTMLButtonElement;
  //   switchButton.addEventListener('click', (event: Event) => {
  //     this.switchPharamcist();
  //   });
  // }

  private switchPharamcist(): void {
    this.pharmacistService.switchPharmacists();
  }

  private findAndDrawActivePharmacist(pharmacist: Pharmacist): void {
    // this.pharmacistService
    //   .fetchAllPharmacists()
    //   .subscribe((pharmacists: Array<Pharmacist>) => {
    //     pharmacists.map((pharmacist: Pharmacist) => {
    //       if (!pharmacist.isAvailable) {
    //         this.drawActivePharmacist();
    //       }
    //     });
    //   });
    // this.drawActivePharmacist();
  }

  private drawActivePharmacist(pharmacist: Pharmacist): void {
    // this.findActivePharmacist().subscribe((pharmacist: Pharmacist) => {
    var container: HTMLDivElement = document.getElementById(
      'pharmacistDiv'
    ) as HTMLDivElement;

    container.innerHTML = '';

    container.innerHTML = `<p class="lead">Aktivan radnik: ${pharmacist.name}<br /></p>
      <button id="switchButton">Zameni</button>`;

    let switchButton: HTMLButtonElement = document.getElementById(
      'switchButton'
    ) as HTMLButtonElement;
    switchButton.addEventListener('click', (event: Event) => {
      this.switchPharamcist();
    });
    // });
  }

  // private findActivePharmacist(): Observable<any> {
  //   return from(
  //     this.pharmacistService
  //       .fetchAllPharmacists()
  //       .toPromise()
  //       .then((pharmacists: Array<Pharmacist>) => {
  //         let pharmacist: Pharmacist;
  //         pharmacists.map((fetchedPharmacist: Pharmacist) => {
  //           if (!fetchedPharmacist.isAvailable) pharmacist = fetchedPharmacist;
  //         });
  //         return pharmacist;
  //       })
  //   );
  // }
}
export default DrawSimulation;
