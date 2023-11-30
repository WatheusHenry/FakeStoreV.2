import dayjs from 'dayjs/esm';

import { IOrder, NewOrder } from './order.model';

export const sampleWithRequiredData: IOrder = {
  id: 22575,
  orderDate: dayjs('2023-11-28T04:26'),
  status: 'DELIVERED',
  totalAmount: 29471.49,
};

export const sampleWithPartialData: IOrder = {
  id: 9597,
  orderDate: dayjs('2023-11-28T01:57'),
  status: 'CANCELLED',
  totalAmount: 9824.83,
};

export const sampleWithFullData: IOrder = {
  id: 10179,
  orderDate: dayjs('2023-11-28T11:46'),
  status: 'CANCELLED',
  totalAmount: 4097.71,
};

export const sampleWithNewData: NewOrder = {
  orderDate: dayjs('2023-11-27T22:50'),
  status: 'DELIVERED',
  totalAmount: 7615.4,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
