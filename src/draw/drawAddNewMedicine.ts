class DrawAddNewMedicine {
  public draw() {
    var container: HTMLDivElement = document.getElementById(
      'startDiv'
    ) as HTMLDivElement;

    var inputForm: HTMLFormElement = document.createElement('form');
    inputForm.className = 'inputForm';
    container.appendChild(inputForm);

    var nameDiv: HTMLDivElement = document.createElement('div');
    inputForm.appendChild(nameDiv);

    var nameLabel: HTMLLabelElement = document.createElement('label');
    nameLabel.innerHTML = 'Ime:';
    nameDiv.appendChild(nameLabel);

    var nameInputDiv: HTMLDivElement = document.createElement('div');
    nameDiv.appendChild(nameInputDiv);

    var nameInput: HTMLInputElement = document.createElement('input');
    nameInput.id = 'nameInput';
    nameInputDiv.appendChild(nameInput);

    var prescriptionFieldSet: HTMLFieldSetElement = document.createElement(
      'fieldset'
    );
    inputForm.appendChild(prescriptionFieldSet);

    var prescriptionInputDiv: HTMLDivElement = document.createElement('div');
    prescriptionFieldSet.appendChild(prescriptionInputDiv);

    var prescriptionLegend: HTMLLegendElement = document.createElement(
      'legend'
    );
    prescriptionLegend.innerHTML = 'Potreban recept:';
    prescriptionInputDiv.appendChild(prescriptionLegend);

    var radioButtonsDiv: HTMLDivElement = document.createElement('div');
    prescriptionInputDiv.appendChild(radioButtonsDiv);

    var prescriptionTrueDiv: HTMLDivElement = document.createElement('div');
    radioButtonsDiv.appendChild(prescriptionTrueDiv);

    var prescriptionTrueInput: HTMLInputElement = document.createElement(
      'input'
    );
    prescriptionTrueInput.id = 'presriptionInput';
    prescriptionTrueInput.type = 'radio';
    prescriptionTrueInput.value = 'true';
    prescriptionTrueInput.name = 'radioButton';
    prescriptionTrueDiv.appendChild(prescriptionTrueInput);

    var prescriptionTrueLabel: HTMLLabelElement = document.createElement(
      'label'
    );
    prescriptionTrueLabel.innerHTML = 'Da';
    prescriptionTrueDiv.appendChild(prescriptionTrueLabel);

    var prescritpionFalseDiv: HTMLDivElement = document.createElement('div');
    radioButtonsDiv.appendChild(prescritpionFalseDiv);

    var prescriptionFalseInput: HTMLInputElement = document.createElement(
      'input'
    );
    prescriptionTrueInput.id = 'presriptionInput';
    prescriptionFalseInput.type = 'radio';
    prescriptionFalseInput.value = 'false';
    prescriptionFalseInput.name = 'radioButton';
    prescritpionFalseDiv.appendChild(prescriptionFalseInput);

    var prescriptionFalseLabel: HTMLLabelElement = document.createElement(
      'label'
    );
    prescriptionFalseLabel.innerHTML = 'Ne';
    prescritpionFalseDiv.appendChild(prescriptionFalseLabel);

    var countDiv: HTMLDivElement = document.createElement('div');
    inputForm.appendChild(countDiv);

    var countLabel: HTMLLabelElement = document.createElement('label');
    countLabel.innerHTML = 'Kolicina:';
    countDiv.appendChild(countLabel);

    var countInputDiv: HTMLDivElement = document.createElement('div');
    countDiv.appendChild(countInputDiv);

    var countInput: HTMLInputElement = document.createElement('input');
    countInput.type = 'number';
    countInput.id = 'nameInput';
    countInputDiv.appendChild(countInput);

    var buttonDiv: HTMLDivElement = document.createElement('div');
    inputForm.appendChild(buttonDiv);

    var submitButtonDiv: HTMLDivElement = document.createElement('div');
    buttonDiv.appendChild(submitButtonDiv);

    var submitButton: HTMLButtonElement = document.createElement('button');
    submitButtonDiv.appendChild(submitButton);
    submitButton.type = 'submit';
    submitButton.innerHTML = 'Dodaj';

    nameDiv.className = 'form-group row';
    nameLabel.className = 'col-sm-2 col-form-label';
    nameInputDiv.className = 'col-sm-10';
    nameInput.className = 'form-control';
    prescriptionFieldSet.className = 'form-group';
    prescriptionInputDiv.className = 'row';
    prescriptionLegend.className = 'col-form-label col-sm-2 pt-0';
    radioButtonsDiv.className = 'col-sm-10';
    prescriptionTrueDiv.className = 'form-check';
    prescriptionTrueInput.className = 'form-check-input';
    prescriptionTrueLabel.className = 'form-check-label';
    prescritpionFalseDiv.className = 'form-check';
    prescriptionFalseInput.className = 'form-check-input';
    prescriptionFalseLabel.className = 'form-check-label';
    countDiv.className = 'form-group row';
    countLabel.className = 'col-sm-2 col-form-label';
    countInputDiv.className = 'col-sm-10';
    countInput.className = 'form-control';
    buttonDiv.className = 'form-group row';
    submitButtonDiv.className = 'col-sm-10';
    submitButton.className = 'btn btn-primary';
  }
}
export default DrawAddNewMedicine;
