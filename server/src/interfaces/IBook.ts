import { IEntity } from "./IEntity";

  
  export interface IBook extends IEntity{
    title?:string,
    description?:string,
    image?:string;
    author?:string;
    price?:number;
  }


  export interface IBookList extends Array<IBook> {
    
  }