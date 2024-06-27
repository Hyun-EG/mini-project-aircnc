import { ThemeProvider } from 'styled-components';
import AppRoutes from './Routes/AppRoutes.tsx';
import GlobalStyle from './style/GlobalStyle.tsx';
import theme from './style/theme.ts';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
