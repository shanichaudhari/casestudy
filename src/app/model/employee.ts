import { Company } from "./company";

export class Employee {
  constructor(
    public id:number,
    public name:string,
    public salary:number,
    public email:string,
    public company:Company
    ){
  }
}
