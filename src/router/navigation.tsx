import React from 'react';
import Login from '../pages/login';
import Register from '../pages/register';
import ScanResult from '../pages/result';
import DummySucceeds from '../pages/succeeds';
import ScannedList from '../pages/lists';
import ScannedItemView from '../pages/scanned-view';

export const ACCESS_DENY_ON_SIGNED_IN = ['/login', , '/register'];
export const ACCESS_DENY_ON_SIGNED_OUT = ['/articles/create', '/users/me'];

export interface Navigation {
  path: string;
  element: JSX.Element;
}

const navigation: Navigation[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/result/:id',
    element: <ScanResult />,
  },
  {
    path: '/scan_stored_injection_success',
    element: <DummySucceeds />,
  },
  {
    path: '/scan_reflected_injection_success',
    element: <DummySucceeds />,
  },
  {
    path: '/list',
    element: <ScannedList />,
  },
  {
    path: '/list/:id',
    element: <ScannedItemView />,
  },
];

export default navigation;
