const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  public readonly id: string;
  public readonly props: T;

  constructor (props: T, id: string) {
    this.id = id;
    this.props = props;
  }

  public equals (that?: Entity<T>) : boolean {

    if (that == null || that == undefined) {
      return false;
    }

    if (this === that) {
      return true;
    }

    if (!isEntity(that)) {
      return false;
    }

    return this.id === that.id;
  }
}
