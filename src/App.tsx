import Button from '@mui/material/Button';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/global/Header';
import Home from './pages/home';
import navigation from './router/navigation';
import Loading from './components/global/Loading';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: '',
          style: {
            fontFamily: 'Poppins',
            maxWidth: 800,
          },
        }}
      />
      <Loading />
      <Header />
      <div style={{ fontFamily: 'Poppins' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          {navigation.map(({ path, element }, index) => {
            return <Route {...{ key: index, path, element }} />;
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
}
