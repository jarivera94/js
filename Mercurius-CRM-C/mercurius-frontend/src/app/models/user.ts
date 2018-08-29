export class User {
  constructor(
    public id: number,
    public firstname: string,
    public lastname: string,
    public email: string,
    public username: string,
    public password: string,
    public creationDate: Date,
    public modificationDate: Date
  ) { }

  getFullName() {
    return this.firstname + ' ' + this.lastname;
  }
}
