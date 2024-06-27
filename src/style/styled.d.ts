import 'styled-components';
import { ColorTypes, FontWeightTypes } from './theme.ts';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: ColorTypes;
    fontWeight: FontWeightTypes;
  }
}
