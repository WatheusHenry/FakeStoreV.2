import dayjs from 'dayjs/esm';
// import { ICustomer } from 'app/entities/customer/customer.model';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';
import { IUser } from 'app/admin/user-management/user-management.model';

export interface IOrder {
  id: number;
  orderDate?: dayjs.Dayjs | null;
  status?: keyof typeof OrderStatus | null;
  totalAmount?: number | null;
  customer?: Pick<IUser, 'id'> | null;
}

export type NewOrder = Omit<IOrder, 'id'> & { id: null };
