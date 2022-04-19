const isEntity = (v: unknown): v is Entity<unknown> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  abstract id: string;

  public equals(that?: Entity<T>): boolean {
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
