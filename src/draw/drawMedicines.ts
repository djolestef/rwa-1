import MedicineService from '../services/medicine.service';
import Medicine from '../Models/Medicine';
import DrawUpdateMedicine from './drawUpdateMedicine';
import DrawAddNewMedicine from './drawAddNewMedicine';
import {fromEvent} from 'rxjs';
import {debounceTime, map, filter, switchMap, catchError} from 'rxjs/operators';

class DrawMedicines {
  private medicineService: MedicineService;
  private drawUpdateMedicine: DrawUpdateMedicine;
  private drawAddNewMedicine: DrawAddNewMedicine;

  constructor() {
    this.medicineService = new MedicineService();
    this.drawUpdateMedicine = new DrawUpdateMedicine();
    this.drawAddNewMedicine = new DrawAddNewMedicine();
  }

  public draw(): void {
    let container: HTMLDivElement = document.getElementById(
      'startDiv'
    ) as HTMLDivElement;

    container.innerHTML = '';

    let upperDiv: HTMLDivElement = document.createElement('div');
    upperDiv.id = 'upperDiv';
    upperDiv.className = 'd-flex';
    container.appendChild(upperDiv);

    let searchDiv: HTMLDivElement = document.createElement('div');
    searchDiv.className = 'mr-auto p-2';
    upperDiv.appendChild(searchDiv);
    searchDiv.id = 'searchDiv';

    let searchLabel: HTMLLabelElement = document.createElement('label');
    searchLabel.id = 'searchLabel';
    searchDiv.appendChild(searchLabel);
    searchLabel.innerHTML = 'Proveri dostupnost leka: ';

    let searchInput: HTMLInputElement = document.createElement('input');
    searchInput.id = 'searchInput';
    searchInput.className = 'form-control';
    searchDiv.appendChild(searchInput);

    let responseLabel: HTMLLabelElement = document.createElement('label');
    responseLabel.id = 'responseLabel';
    searchDiv.appendChild(responseLabel);

    let addNewButtonDiv: HTMLDivElement = document.createElement('div');
    addNewButtonDiv.id = 'addNewButtonDiv';
    addNewButtonDiv.className = 'p-2';
    upperDiv.appendChild(addNewButtonDiv);

    let addNewMedicineButton: HTMLButtonElement = document.createElement(
      'button'
    );
    addNewButtonDiv.appendChild(addNewMedicineButton);
    addNewMedicineButton.id = 'addNewMedicineButton';
    addNewMedicineButton.className = 'btn btn-success';
    addNewMedicineButton.innerHTML = 'Dodaj lek';
    addNewMedicineButton.onclick = (ev) => {
      this.drawAddNewMedicine.draw();
    };

    fromEvent(searchInput, 'input')
      .pipe(
        debounceTime(500),
        map((ev: any) => ev.target.value),
        switchMap((medicineName: string) =>
          this.medicineService.fetchMedicineByName(
            this.capitalizeFirstLetter(medicineName)
          )
        )
      )
      .subscribe((medicines: Array<Medicine>) => {
        medicines[0]
          ? ((responseLabel.innerHTML = 'Dostupan'),
            (responseLabel.style.color = 'green'))
          : ((responseLabel.innerHTML = 'Nije dostupan'),
            (responseLabel.style.color = 'red'));

        if (searchInput.value == '') {
          responseLabel.innerHTML = '';
        }
      });

    let table: HTMLTableElement = document.createElement('table');
    table.className = 'table';
    container.appendChild(table);

    let tableBody: HTMLTableSectionElement = document.createElement('tbody');
    table.appendChild(tableBody);

    this.drawHeader(table);

    this.medicineService
      .fetchAllMedicines()
      .subscribe((medicines: Array<Medicine>) =>
        medicines.forEach((medicine: Medicine) => {
          this.drawMedicineRow(medicine, tableBody);
        })
      );
  }

  private drawHeader(table: HTMLTableElement): void {
    let tableHeader: HTMLTableSectionElement = document.createElement('thead');
    tableHeader.className = 'thead-dark';
    table.appendChild(tableHeader);

    let headerData1: HTMLTableHeaderCellElement = document.createElement('th');
    headerData1.innerHTML = '#';
    tableHeader.appendChild(headerData1);

    let headerData2: HTMLTableHeaderCellElement = document.createElement('th');
    headerData2.innerHTML = 'Naziv';
    tableHeader.appendChild(headerData2);

    let headerData3: HTMLTableHeaderCellElement = document.createElement('th');
    headerData3.innerHTML = 'Potreban recept';
    tableHeader.appendChild(headerData3);

    let headerData4: HTMLTableHeaderCellElement = document.createElement('th');
    headerData4.innerHTML = 'Na stanju';
    tableHeader.appendChild(headerData4);

    let headerData5: HTMLTableHeaderCellElement = document.createElement('th');
    headerData5.innerHTML = 'Izmene';
    tableHeader.appendChild(headerData5);
  }

  private drawMedicineRow(
    medicine: Medicine,
    tableBody: HTMLTableSectionElement
  ): void {
    let tableRow: HTMLTableRowElement = document.createElement('tr');
    tableBody.appendChild(tableRow);

    let idData: HTMLTableDataCellElement = document.createElement('td');
    tableRow.appendChild(idData);
    idData.innerHTML = `${medicine.id}`;

    let nameData: HTMLTableDataCellElement = document.createElement('td');
    tableRow.appendChild(nameData);
    nameData.className = 'nameData';
    nameData.innerHTML = `${medicine.name}`;

    let prescriptionData: HTMLTableDataCellElement = document.createElement(
      'td'
    );
    tableRow.appendChild(prescriptionData);
    if (medicine.needsPrescription) prescriptionData.innerHTML = 'Da';
    else prescriptionData.innerHTML = 'Ne';

    let countData: HTMLTableDataCellElement = document.createElement('td');
    tableRow.appendChild(countData);
    countData.innerHTML = `${medicine.count}`;

    let modifyData: HTMLTableDataCellElement = document.createElement('td');
    tableRow.appendChild(modifyData);

    let deleteMedicineButton: HTMLButtonElement = document.createElement(
      'button'
    );
    deleteMedicineButton.id = 'deleteMedicineButton';
    modifyData.appendChild(deleteMedicineButton);
    deleteMedicineButton.className = 'btn btn-danger';
    deleteMedicineButton.innerHTML = 'Obriši';
    deleteMedicineButton.addEventListener('click', (event: Event) => {
      this.medicineService.deleteMedicine(medicine.id);
    });

    let editMedicineButton: HTMLButtonElement = document.createElement(
      'button'
    );
    editMedicineButton.id = 'editMedicineButton';
    editMedicineButton.className = 'btn btn-info';
    modifyData.appendChild(editMedicineButton);
    editMedicineButton.innerHTML = 'Izmeni';
    editMedicineButton.addEventListener('click', (event: Event) => {
      this.drawUpdateMedicine.draw(medicine.id);
    });
  }

  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
export default DrawMedicines;
