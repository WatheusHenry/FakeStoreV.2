import dayjs from 'dayjs/esm';
import { ICustomer } from 'app/entities/customer/customer.model';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';

export interface IOrder {
  id: number;
  orderDate?: dayjs.Dayjs | null;
  status?: keyof typeof OrderStatus | null;
  totalAmount?: number | null;
  customer?: Pick<ICustomer, 'id'> | null;
}

export type NewOrder = Omit<IOrder, 'id'> & { id: null };
