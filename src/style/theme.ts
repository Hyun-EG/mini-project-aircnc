import { DefaultTheme } from 'styled-components';

const color = {
  primary: '#FF385C',
};

const fontWeight = {
  normal: '400',
  bold: '700',
};

export type ColorTypes = typeof color;
export type FontWeightTypes = typeof fontWeight;

const theme: DefaultTheme = {
  color,
  fontWeight,
};

export default theme;
