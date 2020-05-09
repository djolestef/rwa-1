import MedicineService from '../services/medicine.service';
import Medicine from '../Models/Medicine';
import DrawUpdateMedicine from './drawUpdateMedicine';

class DrawMedicines {
  private medicineService: MedicineService;
  private drawUpdateMedicine: DrawUpdateMedicine;

  constructor() {
    this.medicineService = new MedicineService();
    this.drawUpdateMedicine = new DrawUpdateMedicine();
  }

  public draw(): void {
    var container: HTMLDivElement = document.getElementById(
      'startDiv'
    ) as HTMLDivElement;

    container.innerHTML = '';

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
