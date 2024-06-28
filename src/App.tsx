import { ThemeProvider } from 'styled-components';
import AppRoutes from './Routes/AppRoutes.tsx';
import GlobalStyle from './style/GlobalStyle.tsx';
import GlobalFont from './style/GlobalFont.tsx';
import theme from './style/theme.ts';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalFont />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
