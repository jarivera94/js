export class Campaign {
  constructor(
    public name: string,
    public startDate: string,
    public endDate: string,
    public description: string,
    public type: string,
    public status: string,
    public budget: string,
    public actualCost: string,
    public project: string    
  ) { }
}
