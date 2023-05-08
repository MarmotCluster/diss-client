import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import InjectionOnline from '../../components/InjectionOnline';
import { useNavigate } from 'react-router-dom';

const ScanResult = (props: any) => {
  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box
          sx={{
            width: '100%',
            // minHeight: 'calc(100vh - 8rem)',
            display: 'flex',
            flexDirection: 'column',
            //   justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <InjectionOnline />
          <Box
            sx={{
              borderRadius: 2,
              bgcolor: '#fff',
              border: '1px solid #c2c2c2',
              boxShadow: '0px 8px 20px rgba(0,0,0,0.16)',
              p: '20px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Typography>https://example.com</Typography>
            <Box sx={{ my: 4, width: '100%', '& > *:not(:first-child)': { mt: 2 } }}>
              <Box sx={{ width: '50%', height: 3, bgcolor: '#c2c2c2' }} />
              <Box sx={{ width: `calc(50% - 4rem)`, height: 3, bgcolor: '#c2c2c2' }} />
              <Box sx={{ width: `calc(50% - 4rem)`, height: 3, bgcolor: '#c2c2c2' }} />
            </Box>
          </Box>
        </Box>
      </Container>
      <Box sx={{ width: '100%', bgcolor: 'white', position: 'relative', border: '1px solid rgb(254,255,255)' }}>
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            background: 'linear-gradient(180deg, rgba(254,255,255,0) 0%, rgba(254,255,255,1) 70%)',
            height: '4rem',
            top: '-4rem',
            // border: '1px solid black',
          }}
        ></Box>
        <Box sx={{ p: 3, height: 'auto' }}>
          <Typography>* Found Attack 1</Typography>
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: '#373737',
              borderRadius: 2,
              color: 'white',
            }}
          >
            <Typography variant="body2">{`<input type="text" ....`}</Typography>
          </Box>
        </Box>
        <Box sx={{ p: 3, pt: 0, height: 'auto' }}>
          <Typography>* Found Attack 2</Typography>
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor: '#373737',
              borderRadius: 2,
              color: 'white',
            }}
          >
            <Typography variant="body2">{`<input type="text" ....`}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            background: 'linear-gradient(180deg, rgba(254,255,255,1) 30%, rgba(254,255,255,0) 100%)',
            height: '4rem',
            bottom: '-4rem',
            // border: '1px solid black',
          }}
        ></Box>
      </Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            borderRadius: 2,
            bgcolor: '#fff',
            border: '1px solid #c2c2c2',
            boxShadow: '0px 8px 20px rgba(0,0,0,0.16)',
            p: 2,
            pt: 8,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Button
            variant="contained"
            size="large"
            fullWidth
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 900,
              background: `linear-gradient(90deg, rgba(255,162,0,1) 0%, rgba(255,221,0,1) 100%)`,
              border: `1px solid #AE6F00`,
              boxShadow: 'none',
            }}
            onClick={() => navigate('/')}
          >
            TRY ANOTHER SITE
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ScanResult;