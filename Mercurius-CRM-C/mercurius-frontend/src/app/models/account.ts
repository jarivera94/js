export class Account {
  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public phone: string,
    public address: string,
    public description: string,    
    public typeDocument: string,
    public documentNumber: string,
    public Campaign: string,    
    public email: string,
    public contacts: any   
  ) { }
}