/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DomainEvent } from "./DomainEvent";
import { AggregateRoot } from "../AggregateRoot";

export class DomainEvents {
  private static handlersMap = {};
  private static markedAggregates: AggregateRoot<any>[] = [];

  public static markAggregateForDispatch(aggregate: AggregateRoot<any>): void {
    const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
      this.markedAggregates.push(aggregate);
    }
  }

  private static dispatchAggregateEvents(aggregate: AggregateRoot<any>): void {
    aggregate.domainEvents.forEach((event: DomainEvent) =>
      this.dispatch(event)
    );
  }

  private static removeAggregateFromMarkedDispatchList(
    aggregate: AggregateRoot<any>
  ): void {
    const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
    this.markedAggregates.splice(index, 1);
  }

  private static findMarkedAggregateByID(id: string): AggregateRoot<any> {
    const result = this.markedAggregates.find((e) => e.id === id);
    if (!result) {
      throw new Error("aggregate not found");
    }
    return result;
  }

  public static dispatchEventsForAggregate(id: string): void {
    const aggregate = this.findMarkedAggregateByID(id);

    if (aggregate) {
      this.dispatchAggregateEvents(aggregate);
      aggregate.clearEvents();
      this.removeAggregateFromMarkedDispatchList(aggregate);
    }
  }

  public static register(
    callback: (event: DomainEvent) => void,
    eventClassName: string
  ): void {
    if (
      !Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)
    ) {
      // @ts-ignore
      this.handlersMap[eventClassName] = [];
    }
    // @ts-ignore
    this.handlersMap[eventClassName].push(callback);
  }

  public static clearHandlers(): void {
    this.handlersMap = {};
  }

  public static clearMarkedAggregates(): void {
    this.markedAggregates = [];
  }

  private static dispatch(event: DomainEvent): void {
    const eventClassName = event.constructor.name;

    if (
      Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)
    ) {
      // @ts-ignore
      const handlers: any[] = this.handlersMap[eventClassName];
      for (const handler of handlers) {
        handler(event);
      }
    }
  }
}
