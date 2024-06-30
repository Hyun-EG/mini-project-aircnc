import { DefaultTheme } from 'styled-components';

const color = {
  primary: '#FF385C',
};

const fontWeight = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

export type ColorTypes = typeof color;
export type FontWeightTypes = typeof fontWeight;

const theme: DefaultTheme = {
  color,
  fontWeight,
};

export default theme;
