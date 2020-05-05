class Customer {
  public id: number;
  public medicines: Array<String>;
  public hasPrescription: Array<boolean>;

  constructor(
    id: number,
    medicines: Array<String>,
    hasPrescription: Array<boolean>
  ) {
    this.id = id;
    this.medicines = medicines;
    this.hasPrescription = hasPrescription;
  }
}
export default Customer;
