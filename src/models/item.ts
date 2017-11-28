export class Item{
    public name: string;
    public message: string;
    private length:number;
    private width: number;
    private height: number;
    private weight: number;
    private profilePic = '../assets/img/mcrib.jpg';
    private static DIM_UNITS: string = "inches"
    private static WEIGHT_UNITS: string = "pounds"
  
    constructor(itemObject){
      this.name = itemObject.name;
      this.message = itemObject.message;
      this.length = itemObject.length;
      this.width = itemObject.width;
      this.height = itemObject.height;
      this.weight = itemObject.weight;
      this.profilePic = itemObject.profilePic;
    }
  }