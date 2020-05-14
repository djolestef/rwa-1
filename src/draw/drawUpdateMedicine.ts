import MedicineService from '../services/medicine.service';
import DrawAddOrEditForm from './drawAddOrEditForm';
import Medicine from '../Models/Medicine';

class DrawUpdateMedicine {
  private medicineService: MedicineService;
  constructor() {
    this.medicineService = new MedicineService();
  }

  public draw(id): void {
    let container: HTMLDivElement = document.getElementById(
      'startDiv'
    ) as HTMLDivElement;
    container.innerHTML = '';
    let drawAddOrEditForm: DrawAddOrEditForm = new DrawAddOrEditForm();

    this.medicineService
      .fetchMedicineById(id)
      .subscribe((medicine: Medicine) => {
        container.innerHTML = drawAddOrEditForm.draw(medicine);

        let submitButton: HTMLButtonElement = document.getElementById(
          'submitButton'
        ) as HTMLButtonElement;

        submitButton.innerHTML = 'Izmeni';

        submitButton.addEventListener('click', (event: Event) => {
          event.preventDefault();
          this.medicineService.updateMedicine(id);
        });
      });
  }
}
export default DrawUpdateMedicine;
