export interface QueryHandler<Q, V> {
  handle(query: Q): V;
}
