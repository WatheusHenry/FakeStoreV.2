import { ICustomer, NewCustomer } from './customer.model';

export const sampleWithRequiredData: ICustomer = {
  id: 7078,
  firstName: 'Lorena',
  lastName: 'Macedo',
  email: 'Carlos_Costa30@live.com',
};

export const sampleWithPartialData: ICustomer = {
  id: 5312,
  firstName: 'Ana Júlia',
  lastName: 'Albuquerque',
  email: 'MariaEduarda.Moreira25@live.com',
  address: 'via redo',
};

export const sampleWithFullData: ICustomer = {
  id: 13612,
  firstName: 'Joaquim',
  lastName: 'Barros',
  email: 'MariaHelena_Macedo4@gmail.com',
  phoneNumber: 'interest anti',
  address: 'buy',
};

export const sampleWithNewData: NewCustomer = {
  firstName: 'Paulo',
  lastName: 'Reis',
  email: 'Calebe_Melo78@live.com',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
