import {from, interval, fromEvent, merge, MonoTypeOperatorFunction} from 'rxjs';
import {take, map, takeUntil} from 'rxjs/operators';
import PharmacistService from '../services/pharmacist.service';
import CustomerService from '../services/customer.service';
import DrawResponse from './drawResponse';
import Customer from '../Models/Customer';

class DrawSimulation {
  private pharmacistService: PharmacistService;
  private customerService: CustomerService;
  private drawResponse: DrawResponse;
  //   public flag: Boolean;

  constructor() {
    this.pharmacistService = new PharmacistService();
    this.customerService = new CustomerService();
    this.drawResponse = new DrawResponse();
    // this.flag = true;
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
    <p id="responseDiv"></p>
  </div>`;
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

    startSimulationButton.addEventListener('click', (event: Event) => {
      this.start();
    });
  }

  private start() {
    var container: HTMLDivElement = document.getElementById(
      'responseDiv'
    ) as HTMLDivElement;

    container.innerHTML = '';

    interval(1000)
      .pipe(
        map(() => {
          return from(this.customerService.fetchRandomCustomer());
        }),
        take(3)
      )
      .subscribe((obs) =>
        obs.subscribe((customer: Customer) => {
          this.pharmacistService.startWorkWithCustomer(customer);
          setTimeout(() => {
            this.drawResponse.draw(
              this.pharmacistService.canHaveMedicine,
              this.pharmacistService.mustHavePrescription,
              this.pharmacistService.doesntHave
            );
          }, 250);
        })
      );
  }
}
export default DrawSimulation;
