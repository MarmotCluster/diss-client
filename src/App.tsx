import Button from '@mui/material/Button';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import navigation from './router/navigation';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        {navigation.map(({ path, element }, index) => {
          return <Route {...{ key: index, path, element }} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}
