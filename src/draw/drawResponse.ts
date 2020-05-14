import PharmacistService from '../services/pharmacist.service';

class DrawResponse {
  private phamarcistService: PharmacistService;

  constructor() {
    this.phamarcistService = new PharmacistService();
  }

  public draw(
    canHave: string,
    mustHavePrescription: string,
    doesntHave: string,
    container: HTMLDivElement
  ): void {
    container.appendChild(document.createElement('br'));

    if (doesntHave) {
      const doesntHaveParagraph: HTMLParagraphElement = document.createElement(
        'p'
      );
      doesntHaveParagraph.innerHTML = `Trenutno nemamo ${doesntHave}`;
      doesntHaveParagraph.id = 'pharmacyDoesntHaveMedicine';
      doesntHaveParagraph.className = 'lead cantHaveMedicine response';
      container.appendChild(doesntHaveParagraph);
    }

    if (mustHavePrescription) {
      const needsPrescriptionParagraph: HTMLParagraphElement = document.createElement(
        'p'
      );
      needsPrescriptionParagraph.innerHTML = `Morate imati recept za ${mustHavePrescription}`;
      needsPrescriptionParagraph.className = 'lead cantHaveMedicine response';
      needsPrescriptionParagraph.id = 'needsPrescription';
      container.appendChild(needsPrescriptionParagraph);
    }

    if (canHave) {
      const canHaveParagraph: HTMLParagraphElement = document.createElement(
        'p'
      );
      canHaveParagraph.className = 'lead canHaveMedicine response';
      canHaveParagraph.innerHTML = `Mozete dobiti ${canHave}`;
      container.appendChild(canHaveParagraph);
    }
  }
}
export default DrawResponse;
