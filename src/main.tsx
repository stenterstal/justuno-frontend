import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from "react-router";
import { redirectIfAuthenticated } from './auth/redirectIfAuthenticated.ts';
import { requireAuth } from './auth/requireAuth.ts';
import Layout from './components/Layout.tsx';
import './index.css';
import { createGameLoader } from './loaders/createGameLoader.ts';
import { homepageLoader } from './loaders/homepageLoader.ts';
import { playerLoader } from './loaders/playerLoader.ts';
import CreateGame from './pages/CreateGame.tsx';
import Game from './pages/Game.tsx';
import GameResult from './pages/GameResult.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Player from './pages/Player.tsx';
import ScoreInfo from './pages/ScoreInfo.tsx';


const router = createBrowserRouter([
  // public routes
  {
    element: <Layout />,
    loader: redirectIfAuthenticated,
    children: [{ path: "/login", element: <Login /> }],
  },
  // protected routes
  {
    element: <Layout />,
    loader: requireAuth,
    children: [
      { path: "/", element: <Home />, loader: homepageLoader, },
      { path: "/new", element: <CreateGame />, loader: createGameLoader },
      { path: "/game", element: <Game /> },
      { path: "/result", element: <GameResult /> },
      { path: "/info", element: <ScoreInfo /> },
      { path: "/user/:id", element: <Player />, loader: playerLoader },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
