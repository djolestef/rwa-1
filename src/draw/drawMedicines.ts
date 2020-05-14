import MedicineService from '../services/medicine.service';
import Medicine from '../Models/Medicine';
import DrawUpdateMedicine from './drawUpdateMedicine';
import DrawAddNewMedicine from './drawAddNewMedicine';
import {fromEvent, from} from 'rxjs';
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
    var container: HTMLDivElement = document.getElementById(
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

    var addNewMedicineButton: HTMLButtonElement = document.createElement(
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
        map((ev: Event) => ev.target.value),
        // filter((text: string) => text.length >= 3),
        switchMap((medicineName: string) =>
          this.medicineService.fetchMedicineByName(medicineName)
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

    var table: HTMLTableElement = document.createElement('table');
    table.className = 'table';
    container.appendChild(table);

    var tableBody: HTMLTableSectionElement = document.createElement('tbody');
    table.appendChild(tableBody);

    this.drawHeader(table);

    this.medicineService
      .fetchAllMedicines()
      .subscribe((medicines: Array<Medicine>) =>
        medicines.map((medicine: Medicine) => {
          this.drawMedicineRow(medicine, tableBody);
        })
      );
  }

  private drawHeader(table: HTMLTableElement): void {
    var tableHeader: HTMLTableSectionElement = document.createElement('thead');
    tableHeader.className = 'thead-dark';
    table.appendChild(tableHeader);

    var headerData1: HTMLTableHeaderCellElement = document.createElement('th');
    headerData1.innerHTML = '#';
    tableHeader.appendChild(headerData1);

    var headerData2: HTMLTableHeaderCellElement = document.createElement('th');
    headerData2.innerHTML = 'Naziv';
    tableHeader.appendChild(headerData2);

    var headerData3: HTMLTableHeaderCellElement = document.createElement('th');
    headerData3.innerHTML = 'Potreban recept';
    tableHeader.appendChild(headerData3);

    var headerData4: HTMLTableHeaderCellElement = document.createElement('th');
    headerData4.innerHTML = 'Na stanju';
    tableHeader.appendChild(headerData4);

    var headerData5: HTMLTableHeaderCellElement = document.createElement('th');
    headerData5.innerHTML = 'Izmene';
    tableHeader.appendChild(headerData5);
  }

  private drawMedicineRow(
    medicine: Medicine,
    tableBody: HTMLTableSectionElement
  ): void {
    var tableRow: HTMLTableRowElement = document.createElement('tr');
    tableBody.appendChild(tableRow);

    var idData: HTMLTableDataCellElement = document.createElement('td');
    tableRow.appendChild(idData);
    idData.innerHTML = `${medicine.id}`;

    var nameData: HTMLTableDataCellElement = document.createElement('td');
    tableRow.appendChild(nameData);
    nameData.className = 'nameData';
    nameData.innerHTML = `${medicine.name}`;

    var prescriptionData: HTMLTableDataCellElement = document.createElement(
      'td'
    );
    tableRow.appendChild(prescriptionData);
    if (medicine.needsPrescription) prescriptionData.innerHTML = 'Da';
    else prescriptionData.innerHTML = 'Ne';

    var countData: HTMLTableDataCellElement = document.createElement('td');
    tableRow.appendChild(countData);
    countData.innerHTML = `${medicine.count}`;

    var modifyData: HTMLTableDataCellElement = document.createElement('td');
    tableRow.appendChild(modifyData);

    var deleteMedicineButton: HTMLButtonElement = document.createElement(
      'button'
    );
    deleteMedicineButton.id = 'deleteMedicineButton';
    modifyData.appendChild(deleteMedicineButton);
    deleteMedicineButton.className = 'btn btn-danger' /*btn-sm rounded-0'*/;
    deleteMedicineButton.innerHTML = 'Obrisi';
    deleteMedicineButton.addEventListener('click', (event: Event) => {
      this.medicineService.deleteMedicine(medicine.id);
    });

    var editMedicineButton: HTMLButtonElement = document.createElement(
      'button'
    );
    editMedicineButton.id = 'editMedicineButton';
    editMedicineButton.className = 'btn btn-info' /* btn-sm rounded-0'*/;
    modifyData.appendChild(editMedicineButton);
    editMedicineButton.innerHTML = 'Izmeni';
    editMedicineButton.addEventListener('click', (event: Event) => {
      this.drawUpdateMedicine.draw(medicine.id);
    });
  }
}
export default DrawMedicines;
