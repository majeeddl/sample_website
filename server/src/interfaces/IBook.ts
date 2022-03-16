import { IEntity } from "./IEntity";

  
  export interface IBook extends IEntity{
    title?:string,
    description?:string,
    image?:string 
  }