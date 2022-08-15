import { atom } from 'recoil';

//Exporting this as a default value
export const modalState = atom({
  key: 'modalState',
  default: false,
});

export const modalTypeState = atom({
  key: 'modalTypeState',
  default: 'dropIn',
});

export const modalMediaContentState = atom({ key: 'modalMediaContentState', default: 'photo' });
