import PharmacistService from '../services/pharmacist.service';

class DrawResponse {
  private phamarcistService: PharmacistService;

  constructor() {
    this.phamarcistService = new PharmacistService();
  }

  public draw(
    canHave: string,
    mustHavePrescription: string,
    doesntHave: string
  ): void {
    var container: HTMLDivElement = document.getElementById(
      'responseDiv'
    ) as HTMLDivElement;

    if (canHave) {
      const canHaveParagraph: HTMLParagraphElement = document.createElement(
        'p'
      );
      canHaveParagraph.className = 'lead canHaveMedicine response';
      canHaveParagraph.innerHTML = `Mozete dobiti ${canHave}`;
      // console.log(canHave);
      container.appendChild(canHaveParagraph);
    }

    if (mustHavePrescription) {
      const needsPrescriptionParagraph: HTMLParagraphElement = document.createElement(
        'p'
      );
      needsPrescriptionParagraph.innerHTML = `Morate imati recept za ${mustHavePrescription}`;
      needsPrescriptionParagraph.className = 'lead cantHaveMedicine response';
      needsPrescriptionParagraph.id = 'needsPrescription';
      // console.log(mustHavePrescription);
      container.appendChild(needsPrescriptionParagraph);
    }

    if (doesntHave) {
      const doesntHaveParagraph: HTMLParagraphElement = document.createElement(
        'p'
      );
      doesntHaveParagraph.innerHTML = `Trenutno nemamo ${doesntHave}`;
      doesntHaveParagraph.id = 'pharmacyDoesntHaveMedicine';
      doesntHaveParagraph.className = 'lead cantHaveMedicine response';
      // console.log(doesntHave);
      container.appendChild(doesntHaveParagraph);
    }
    container.appendChild(document.createElement('br'));
  }
}
export default DrawResponse;
