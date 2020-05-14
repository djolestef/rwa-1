import DrawMedicines from './draw/drawMedicines';
import DrawSimulation from './draw/drawSimulation';

const drawMedicines = new DrawMedicines();
const drawSimulation: DrawSimulation = new DrawSimulation();

drawMedicines.draw();

let viewAllMedicinesButton: HTMLButtonElement = document.getElementById(
  'viewAllMedicinesButton'
) as HTMLButtonElement;

let startSimulationButton: HTMLButtonElement = document.getElementById(
  'newSimulationButton'
) as HTMLButtonElement;

viewAllMedicinesButton.onclick = (ev: Event) => {
  drawMedicines.draw();
};

startSimulationButton.onclick = (ev: Event) => {
  drawSimulation.draw();
};
