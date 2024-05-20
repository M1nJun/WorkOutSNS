import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import AuthContext from './AuthContext'
import HomePage from './components/HomePage'
import ProfilePage from './components/ProfilePage'
import SearchPage from './components/SearchPage'
import NewPostPage from './components/NewPostPage'
import Sidebar from './components/Sidebar'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  
  
  const [jwt,setJwt] = useState('');

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline></CssBaseline>
      <AuthContext.Provider value={jwt}>
        <BrowserRouter>
          <Sidebar></Sidebar>
          {/* define routes and render the components associated with them*/}
          <Routes>
            <Route path="/" element={<HomePage setJwt={setJwt} />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/newPost" element={<NewPostPage />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
    </>
  )
}

export default App
