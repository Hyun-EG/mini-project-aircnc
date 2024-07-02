import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useCookies } from 'react-cookie';
import { setUser } from './redux/slices/userSlice.ts';
import router from './Routes/router.tsx';
import GlobalStyle from './style/GlobalStyle.tsx';
import GlobalFont from './style/GlobalFont.tsx';
import theme from './style/theme.ts';
import { User } from './schema/userSchema.ts';

function App() {
  const [cookies] = useCookies(['user']);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const response = await fetch('/src/assets/users.json');
      const users = await response.json();

      return users;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    const setUserIfCookieExists = async () => {
      try {
        if (!cookies.user) {
          return;
        }

        const users: User[] = await fetchUser();
        if (!users) {
          return;
        }

        const matchEmail = users.filter((user) => user.email === cookies.user);
        if (!matchEmail.length) {
          return;
        }

        dispatch(setUser(matchEmail[0]));
      } catch (error) {
        console.error(error);
      }
    };
    setUserIfCookieExists();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalFont />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
