import { Entity } from "./Entity";
import { DomainEvent } from "./events/DomainEvent";
import { DomainEvents } from "./events/DomainEvents";

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent (domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
    this.logDomainEventAdded(domainEvent);
  }

  public clearEvents (): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }

  private logDomainEventAdded (domainEvent: DomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    if (thisClass != null && domainEventClass != null) {
      console.info(`[Domain Event Created]:`, thisClass.constructor.name, '==>', domainEventClass.constructor.name)
    }
  }
}
