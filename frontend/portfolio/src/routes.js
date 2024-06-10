import { LogIn, Register, LandingPage, Dashboard, Portfolio, Assets, EditAsset, Profile, ActivityLogs } from './pages/pages';
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import DashboardLayout from './components/layouts/DashboardLayout';
import ViewAsset from './pages/Assets/components/ViewAsset';
import Watchlist from './pages/Watchlist/Watchlist';
import Transactions from './pages/Transactions/Transactions';
import ExecutePythonScript from './pages/Child/ExecutePythonScript';
import Positions from './pages/Reports/components/Positions';

const routes = [
  {
    path: '/sign-in',
    element: <LogIn />
  },
  {
    path: '/sign-up',
    element: <Register /> 
  },
  {
    path: '/',
    element: <LandingPage /> 
  },
  
  {
    path: '/app',
    exact: true,
    element: <>
      <SignedIn>
        <DashboardLayout />
      </SignedIn>
      <SignedOut>
        <LandingPage />
      </SignedOut>
    </>,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'portfolio',
        element: <Portfolio />
      },
      {
        path: 'asset/all',
        element: <Assets />
      },
      {
        path: 'asset/view/:ticker',
        element: <ViewAsset />
      },
      {
        path: 'asset/edit',
        element: <EditAsset />
      },
      {
        path: 'transactions',
        element:<Transactions/>
      },
      {
        path: 'reports/positions',
        element: <Positions/>
      },
      {
        path:'watchlist',
        element:<Watchlist/>
      },
      {
        path: 'child',
        element: <ExecutePythonScript />
      },
      {
        path: 'profile',
        element: <Profile/>
      },
      {
        path:'activity-logs',
        element:<ActivityLogs/>
      },
      // {
      //   path: 'settings',
      //   element: <></>
      // },
      // {
      //   path: 'change-password',
      //   element: <></>
      // },
      // {
      //   path: 'logout',
      //   element: <></>
      // },
    ]
  },
];

export default routes;