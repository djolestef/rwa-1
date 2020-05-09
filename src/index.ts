import Medicine from './Models/Medicine';
import Pharmacist from './Models/Pharmacist';
import Customer from './Models/Customer';
import CustomerService from './services/customer.service';
import {from, interval, Observable, fromEvent, merge} from 'rxjs';
import {take, map, takeUntil} from 'rxjs/operators';
import PharmacistService from './services/pharmacist.service';
import DrawResponse from './draw/drawResponse';
import DrawMedicines from './draw/drawMedicines';
import DrawAddNewMedicine from './draw/drawAddNewMedicine';
import MedicineService from './services/medicine.service';
import DrawTest from './draw/drawAddOrEditForm';
import DrawAddOrEditForm from './draw/drawAddOrEditForm';
import DrawSimulation from './draw/drawSimulation';

const pharmacistService = new PharmacistService();
const customerService = new CustomerService();
const drawResponse = new DrawResponse();
const drawMedicines = new DrawMedicines();
const drawAddNewMedicine = new DrawAddNewMedicine();
const medicineService = new MedicineService();
const drawAddOrEditForm: DrawAddOrEditForm = new DrawAddOrEditForm();
const drawSimulation: DrawSimulation = new DrawSimulation();

const customer = new Customer(1, ['aa', 'bb'], [true, false]);
var i: number = 0;

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
  'newSimulationButton'
) as HTMLButtonElement;

fromEvent(startSimulationButton, 'click').subscribe(() => {
  drawSimulation.draw();
});

// interval(1000)
//   .pipe(takeUntil(fromEvent(document, 'click')))
//   .subscribe((x) => console.log(x));

// const clicks = fromEvent(document, 'click');
// const timer = interval(1000);
// const clicksOrTimer = merge(clicks, timer);
// clicksOrTimer.subscribe((x) => console.log(x));

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
