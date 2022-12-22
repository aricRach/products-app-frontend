export interface CounterAction {
  actionType: 'increase' | 'decrease';
  id: number;
  numberOfItems: number;
}
