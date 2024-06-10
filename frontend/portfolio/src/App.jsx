<<<<<<< HEAD
import { dark } from '@clerk/themes';
import { BrowserRouter, Routes, Route, useNavigate, useRoutes } from "react-router-dom";
import { LogIn, Register, LandingPage, Dashboard } from './pages/pages';
import './App.css';
import { 
  ClerkProvider,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/clerk-react";
import Portfolio from './pages/Portfolio/Portfolio';
import routes from './routes';
import { Provider, useSelector } from 'react-redux';
import { useEffect } from 'react';

  
const clerkPubKey = "pk_test_dHJ1c3RpbmctcXVldHphbC03Ny5jbGVyay5hY2NvdW50cy5kZXYk";

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  const allPages = useRoutes(routes);

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        // baseTheme: dark
      }}
      navigate={(to) => navigate(to)}
    >
      {allPages}
    </ClerkProvider>
  );
}

function App() {
  const mode = useSelector((state) => state.config.mode);

  useEffect(() => {
    if(mode === "dark") {
      const html = document.querySelector('html');
      html.classList.add('dark');
    } else if (mode === "light") {
      const html = document.querySelector('html');
      html.classList.remove('dark');
    }
  }, [mode])

  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}


export default App;
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> 0ca6e0ca1d913652ca1cb051eb542672f28b2d09
