import { AggregateRoot } from "../../../../../common/domain/AggregateRoot";

export interface ShopProps {
  id: string;
  name: string;
}

export class Shop extends AggregateRoot<Shop> {
  public readonly id: string;
  private _name: string;

  constructor(props: ShopProps) {
    super();
    this.id = props.id;
    this._name = props.name;
  }

  get name(): string {
    return this._name;
  }
}
