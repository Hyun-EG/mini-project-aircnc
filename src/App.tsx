import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import router from './Routes/router.tsx';
import GlobalStyle from './style/GlobalStyle.tsx';
import GlobalFont from './style/GlobalFont.tsx';
import theme from './style/theme.ts';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalFont />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
