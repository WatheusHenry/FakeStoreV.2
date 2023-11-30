import { ICategory, NewCategory } from './category.model';

export const sampleWithRequiredData: ICategory = {
  id: 372,
  name: 'scorch',
};

export const sampleWithPartialData: ICategory = {
  id: 4063,
  name: 'regarding poet',
  description: 'editorialize tomorrow brim',
};

export const sampleWithFullData: ICategory = {
  id: 4454,
  name: 'anti scarce',
  description: 'strictly whenever',
};

export const sampleWithNewData: NewCategory = {
  name: 'than',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
