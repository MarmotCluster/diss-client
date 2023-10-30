import { Box, Button, Container, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import MainLogo from '../../components/MainLogo';
import PathTraversalOnline from '../../components/PathTraversalOnline';
import XSSInjectionOnline from '../../components/XSSInjectionOnline';
import useSearch from '../../hooks/useSearch';
import { globalState } from '../../stores/global/atom';
import { scanResultState } from '../../stores/scanResult/atom';

const ScannedItemView = () => {
  /* hooks */
  const navigate = useNavigate();

  const { id } = useParams();

  const { getResultFromList } = useSearch();

  /* stores */
  const [result, setResult] = useRecoilState(scanResultState);

  const [global, setGlobal] = useRecoilState(globalState);

  /* renders */

  const renderLogo = () => {
    if (result.length > 0 && result[0]?.scanType === 'Path traversal') {
      return <PathTraversalOnline />;
    }

    return <XSSInjectionOnline />;
  };

  const renderScannedResult = () => {
    if (result.length > 0) {
      return result.map((item, index) => {
        const { scanPayload } = item;

        return (
          <Box sx={{ p: 3, height: 'auto' }} key={index}>
            <Typography>* Found Vulnerability {index + 1}</Typography>
            <Box
              sx={{
                mt: 2,
                p: 2,
                bgcolor: '#373737',
                borderRadius: 2,
                color: 'white',
              }}
            >
              <Typography variant="body2" sx={{ color: '#999' }}>
                {item.scanURL}
              </Typography>
              <Typography variant="body2">{scanPayload ? scanPayload : `<input type="text" ....`}</Typography>
            </Box>
          </Box>
        );
      });
    }

    return null;
  };

  useEffect(() => {
    console.log(id);
    const init = async () => {
      setGlobal((v) => ({ ...v, loading: true }));
      try {
        const res = await getResultFromList(Number(id));
        if (res.status === 200) {
          setResult(res.data);
        }
      } catch (err) {
      } finally {
        setGlobal((v) => ({ ...v, loading: false }));
      }
    };

    init();
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* {renderLogo()} */}
          <MainLogo text="Reports" />
          <Box
            sx={{
              mt: 2,
              borderRadius: 2,
              bgcolor: '#fff',
              border: '1px solid #c2c2c2',
              boxShadow: '0px 8px 20px rgba(0,0,0,0.16)',
              p: '20px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Typography>
              {result.length > 0 && result[0]?.inputURL ? result[0].inputURL : `https://example.com`}
            </Typography>
            <Typography sx={{ color: '#999' }} variant="body2">
              Type : {result.length > 0 ? result[0].scanType : 'Unknown'}
            </Typography>
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
        {renderScannedResult()}
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
            mb: 4,
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

export default ScannedItemView;
