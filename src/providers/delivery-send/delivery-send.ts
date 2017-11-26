import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the DeliverySendProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeliverySend {

  private recipient:string = "testing recipient";
  private items:Item[];

  constructor(public http: HttpClient) {
    
  }

  

}

export class Item{
  public name: string;
  private length:number;
  private width: number;
  private height: number;
  private weight: number;
  private message: string;
  private static DIM_UNITS: string = "inches"
  private static WEIGHT_UNITS: string = "pounds"

  constructor(){

  }

  private toString():string{
    return `Length: ${this.length}  Width: ${this.width} Height: ${this.height} Weight ${this.weight}\n
    ${this.message}`;
  }

}