import { BrowserRouter } from 'react-router-dom';
import { UserContext } from './src/context/UserContext';
import { useContext, useEffect } from 'react';
import TokenService from './src/services/token.service';
import MainLayout from './app/layouts/MainLayout';
import MainRouter from './app/routers/MainRouter';

function App() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const user = TokenService.getUserFromLocalToken()
    setUser(user)
  }, [])

  return (
    <BrowserRouter>
      <MainLayout>
        <MainRouter />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;