import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import Home from './pages/Home.tsx'
import Layout from './components/Layout.tsx';
import NewGame from './pages/NewGame.tsx';
import Login from './pages/Login.tsx';
import { AuthProvider } from './auth/AuthProvider.tsx';
import ProtectedLayout from './auth/ProtectedLayout.tsx';
import Game from './pages/Game.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Always accessible */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Route>
          {/* Authenticated routes */}
          <Route element={<ProtectedLayout/>}>
            <Route path="/new" element={<NewGame />} />
            <Route path="/game" element={<Game />} />
          </Route>
        </Routes>
        </AuthProvider>
      </BrowserRouter>
  </StrictMode>,
)
