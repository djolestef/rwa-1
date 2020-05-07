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
      'startDiv'
    ) as HTMLDivElement;

    if (canHave) {
      const canHaveLabel: HTMLDivElement = document.createElement('div');
      canHaveLabel.innerHTML = `Mozete dobiti ${canHave}`;
      // console.log(canHave);
      container.appendChild(canHaveLabel);
    }

    if (mustHavePrescription) {
      const needsPrescriptionLabel: HTMLDivElement = document.createElement(
        'div'
      );
      needsPrescriptionLabel.innerHTML = `Morate imati recept za ${mustHavePrescription}`;
      // console.log(mustHavePrescription);
      container.appendChild(needsPrescriptionLabel);
    }

    if (doesntHave) {
      const doesntHaveLabel: HTMLDivElement = document.createElement('div');
      doesntHaveLabel.innerHTML = `Trenutno nemamo ${doesntHave}`;
      // console.log(doesntHave);
      container.appendChild(doesntHaveLabel);
    }
    container.appendChild(document.createElement('br'));
  }
}
export default DrawResponse;
