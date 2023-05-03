import React from 'react';
import { Typography } from '@mui/material';

const InjectionOnline = () => {
  return (
    <Typography
      sx={{
        md: 1,
        fontFamily: 'Poppins',
        fontWeight: 900,
        fontSize: 36,
        mb: 6,
        background: 'linear-gradient(135deg, rgba(255,0,0,1) 0%, rgba(197,0,255,1) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        userSelect: 'none',
      }}
    >
      Injection Online
    </Typography>
  );
};

export default InjectionOnline;
