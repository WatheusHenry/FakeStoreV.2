import { IProduct, NewProduct } from './product.model';

export const sampleWithRequiredData: IProduct = {
  id: 15848,
  name: 'zowie wisely aw',
  price: 5433.44,
};

export const sampleWithPartialData: IProduct = {
  id: 11969,
  name: 'unlike',
  description: 'botch via penalise',
  price: 32651.65,
};

export const sampleWithFullData: IProduct = {
  id: 6582,
  name: 'following forenenst except',
  description: 'total frilly',
  price: 2189.12,
};

export const sampleWithNewData: NewProduct = {
  name: 'an',
  price: 14820.06,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
