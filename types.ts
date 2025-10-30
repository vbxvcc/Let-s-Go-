export enum Unit {
  Kilogram = 'kg',
  Gram = 'g',
  Liter = 'L',
  Milliliter = 'ml',
  Meter = 'm',
  Centimeter = 'cm',
  Piece = 'pcs',
  Pack = 'pack',
  Box = 'box',
  Dozen = 'dz',
}

export interface Item {
  id: string;
  name: string;
  quantity: number;
  unit: Unit;
  price: number;
  total: number;
  date: string;
}
