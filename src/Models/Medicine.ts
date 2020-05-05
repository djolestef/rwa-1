class Medicine {
  public id: number;
  public name: string;
  public needsPrescription: boolean;

  constructor(id: number, name: string, needsPrescription: boolean) {
    this.id = id;
    this.name = name;
    this.needsPrescription = needsPrescription;
  }
}
export default Medicine;
