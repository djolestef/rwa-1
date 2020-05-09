import Medicine from '../Models/Medicine';

class DrawAddOrEditForm {
  public draw(medicine: Medicine = null): string {
    return `<form class="inputForm">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Ime:</label>
          <div class="col-sm-10">
            <input id="nameInput"
             value="${medicine ? medicine.name : ''}" 
             class="form-control" />
          </div>
        </div>
        <fieldset class="form-group">
          <div class="row">
            <legend class="col-form-label col-sm-2 pt-0">Potreban recept:</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input
                  id="prescriptionInputTrue"      
                  type="radio"
                  value="true"
                  name="radioButton"
                  class="form-check-input"
                  ${medicine && medicine.needsPrescription ? `checked` : ''}
                /><label class="form-check-label">Da</label>
              </div>
              <div class="form-check">
                <input
                  id="prescriptionInputFalse"
                  type="radio"
                  value="false"
                  name="radioButton"
                  class="form-check-input"
                  ${medicine && !medicine.needsPrescription ? `checked` : ''}
                /><label class="form-check-label">Ne</label>
              </div>
            </div>
          </div>
        </fieldset>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Kolicina:</label>
          <div class="col-sm-10">
            <input type="number",
             value="${medicine ? medicine.count : ''}"
              id="countInput" class="form-control" />
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <button id="submitButton" type="submit" class="btn btn-primary">
              Dodaj
            </button>
          </div>
        </div>
      </form>
      `;
  }
}
export default DrawAddOrEditForm;
