import MedicineService from '../services/medicine.service';
import DrawAddOrEditForm from './drawAddOrEditForm';
import Medicine from '../Models/Medicine';

class DrawAddNewMedicine {
  private medicineService: MedicineService;

  constructor() {
    this.medicineService = new MedicineService();
  }
  public draw() {
    let container: HTMLDivElement = document.getElementById(
      'startDiv'
    ) as HTMLDivElement;

    container.innerHTML = '';

    let drawAddOrEditForm: DrawAddOrEditForm = new DrawAddOrEditForm();
    container.innerHTML = drawAddOrEditForm.draw();

    let submitButton: HTMLButtonElement = document.getElementById(
      'submitButton'
    ) as HTMLButtonElement;

    let allMedicineNames: Array<string> = [];
    this.medicineService
      .fetchAllMedicines()
      .subscribe((medicines: Array<Medicine>) => {
        medicines.forEach((medicine: Medicine) => {
          allMedicineNames.push(medicine.name);
        });
      });

    submitButton.addEventListener('click', (event: Event) => {
      event.preventDefault();
      this.medicineService.addNewMedicine(allMedicineNames);
    });
  }
}
export default DrawAddNewMedicine;
