export class Lead {
  constructor(
    public id: string,    
    public description: string,
    public salutation: string,
    public firstname: string,
    public lastname: string,
    public phone_home: string,
    public phone_mobile: string,
    public email1: string,
    public date_created: string,
    public customer_type: string,
    public campaign: string,
    public reviewed: string,
    public converted: string
  ) { }
}