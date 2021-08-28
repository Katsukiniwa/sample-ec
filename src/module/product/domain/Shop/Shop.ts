import { AggregateRoot } from "~/common/domain/AggregateRoot";

export interface ProductProps {
  id: string;
  name: string;
  price: number;
}

export class Shop extends AggregateRoot<Shop> {
  public readonly id: string;
  private _name: string;

  constructor(id: string, props: ProductProps) {
    super();
    this.id = id;
    this._name = props.name;
  }
  
  get name(): string {
    return this._name;
  }
}
