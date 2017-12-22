import Item from './item'

export class Shipment{
    public id: string
    public sender: string
    public recipient: string
    public items: Item.Item[]
  
    constructor(itemObject){
      this.id = itemObject.id
      this.sender = itemObject.data.sender
      this.recipient = itemObject.data.recipient
      this.items = itemObject.data.items
    }
  }