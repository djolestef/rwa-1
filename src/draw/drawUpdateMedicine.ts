import MedicineService from '../services/medicine.service';
import DrawAddOrEditForm from './drawAddOrEditForm';

class DrawUpdateMedicine {
  private medicineService: MedicineService;
  constructor() {
    this.medicineService = new MedicineService();
  }

  public draw(id) {
    let container: HTMLDivElement = document.getElementById(
      'startDiv'
    ) as HTMLDivElement;
    container.innerHTML = '';
    let drawAddOrEditForm: DrawAddOrEditForm = new DrawAddOrEditForm();

    this.medicineService.fetchMedicineById(id).subscribe((medicine) => {
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
  //     let drawAddNewMedicine: DrawAddNewMedicine = new DrawAddNewMedicine();
  //     let medicineService: MedicineService = new MedicineService();
  //     let drawMedicines: DrawMedicines = new DrawMedicines();

  //     drawAddNewMedicine.draw();

  //     medicineService.fetchMedicineById(id).subscribe((fetchedMedicine) => {
  //       let medicine: Medicine = new Medicine();
  //       medicine = fetchedMedicine;
  //       let nameInput: HTMLInputElement = document.createElement('input');
  //       nameInput = document.getElementById('nameInput') as HTMLInputElement;
  //       nameInput.value = medicine.name;

  //       let prescriptionInput: HTMLInputElement = document.createElement('input');
  //       let prescriptionInputTrue: HTMLInputElement = document.getElementById(
  //         'prescriptionInputTrue'
  //       ) as HTMLInputElement;

  //       let prescriptionInputFalse: HTMLInputElement = document.getElementById(
  //         'prescriptionInputFalse'
  //       ) as HTMLInputElement;

  //       if (medicine.needsPrescription) prescriptionInputTrue.checked = true;
  //       else prescriptionInputFalse.checked = true;

  //       let countInput: HTMLInputElement = document.createElement('input');
  //       countInput = document.getElementById('countInput') as HTMLInputElement;
  //       countInput.value = medicine.count.toString();

  //       let submitButton: HTMLButtonElement = document.getElementById(
  //         'submitButton'
  //       ) as HTMLButtonElement;
  //       submitButton.innerHTML = 'Izmeni';
  //     //   submitButton.removeEventListener('click');
  //       submitButton.addEventListener('click', (event: Event) => {
  //         medicineService.updateMedicine(id);
  //         drawMedicines.draw();
  //       });
  //     });
  //   }
}
export default DrawUpdateMedicine;
