import { createGlobalStyle } from 'styled-components';
import PretendardExtraBoldWoff2 from './font/Pretendard-ExtraBold.woff2';
import PretendardBoldWoff2 from './font/Pretendard-Bold.woff2';
import PretendardSemiBoldWoff2 from './font/Pretendard-SemiBold.woff2';
import PretendardMediumWoff2 from './font/Pretendard-Medium.woff2';
import PretendardRegularWoff2 from './font/Pretendard-Regular.woff2';
import PretendardExtraBoldWoff from './font/Pretendard-ExtraBold.woff';
import PretendardBoldWoff from './font/Pretendard-Bold.woff';
import PretendardSemiBoldWoff from './font/Pretendard-SemiBold.woff';
import PretendardMediumWoff from './font/Pretendard-Medium.woff';
import PretendardRegularWoff from './font/Pretendard-Regular.woff';

export default createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    font-weight: 800;
    font-display: swap;
    src: local('Pretendard ExtraBold'), url(${PretendardExtraBoldWoff2}) format('woff2'), url(${PretendardExtraBoldWoff}) format('woff'), url(${PretendardRegularWoff2}) format('woff2'), url(${PretendardRegularWoff}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
    src: local('Pretendard Bold'), url(${PretendardBoldWoff2}) format('woff2'), url(${PretendardBoldWoff}) format('woff'), url(${PretendardRegularWoff2}) format('woff2'), url(${PretendardRegularWoff}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    font-display: swap;
    src: local('Pretendard SemiBold'), url(${PretendardSemiBoldWoff2}) format('woff2'), url(${PretendardSemiBoldWoff}) format('woff'), url(${PretendardRegularWoff2}) format('woff2'), url(${PretendardRegularWoff}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    font-display: swap;
    src: local('Pretendard Medium'), url(${PretendardMediumWoff2}) format('woff2'), url(${PretendardMediumWoff}) format('woff'), url(${PretendardRegularWoff2}) format('woff2'), url(${PretendardRegularWoff}) format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src: local('Pretendard Regular'), url(${PretendardRegularWoff2}) format('woff2'), url(${PretendardRegularWoff}) format('woff');
  }
`;
