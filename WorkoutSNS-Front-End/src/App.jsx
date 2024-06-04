import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AuthContext from './AuthContext';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import SearchPage from './components/SearchPage';
import NewPostPage from './components/NewPostPage';
import Sidebar from './components/Sidebar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NewAccountPage from './components/NewAccountPage';
import UpdateProfilePage from './components/UpdateProfilePage';
import UserProfilePage from './components/UserProfilePage';

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: '#000000',
      },
      primary: {
        main: '#FFFFFF',
      },
      text: {
        primary: '#FFFFFF',
        secondary: '#000000',
      },
    },
    typography: {
      h2: {
        fontWeight: 'bold',
      },
      h4: {
        fontWeight: 'bold',
      },
      body1: {
        fontWeight: 'bold',
      },
      button: {
        fontWeight: 'bold',
      },
    },
  });

  const [jwt, setJwt] = useState('');

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AuthContext.Provider value={{ jwt, setJwt }}>
          <BrowserRouter>
            <Sidebar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/newPost" element={<NewPostPage />} />
              <Route path="/new-account" element={<NewAccountPage />} />
              <Route path="/UpdateProfilePage" element={<UpdateProfilePage />} />
              <Route path="/UserProfilePage" element={<UserProfilePage />} />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
