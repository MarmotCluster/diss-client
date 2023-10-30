import React, { useEffect, useState } from 'react';
import useSearch from '../../hooks/useSearch';
import { useRecoilState } from 'recoil';
import { globalState } from '../../stores/global/atom';
import { Avatar, Box, Button, Container, Typography } from '@mui/material';

import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { authState } from '../../stores/auth/atom';
import { useNavigate } from 'react-router-dom';

const ScannedList = () => {
  /* stores */
  const [global, setGlobal] = useRecoilState(globalState);

  const [auth, setAuth] = useRecoilState(authState);

  /* hooks */
  const navigate = useNavigate();

  const { getList } = useSearch();

  /* states */
  interface scanResult {
    id: number;
    scanID: number;
    scanUserEmail: string;
    scanType: string;
    inputURL: string;
    scanURL: string;
    osInfo: unknown;
    scanPayload: string;
  }

  const [list, setList] = useState<scanResult[]>([
    {
      id: 223,
      scanID: 1,
      scanUserEmail: 'temp@temp.com',
      scanType: 'Stored XSS',
      inputURL: 'http://localhost:3000',
      scanURL: 'http://localhost:3000/stored_xss/board/826',
      osInfo: null,
      scanPayload: `<script>alert('xss test');</script>`,
    },
    {
      id: 224,
      scanID: 2,
      scanUserEmail: 'temp@temp.com',
      scanType: 'Stored XSS',
      inputURL: 'http://localhost:3000',
      scanURL: 'http://localhost:3000/stored_xss/board/826',
      osInfo: null,
      scanPayload: `<script>alert('xss test');</script>`,
    },
  ]);

  /* effects */
  useEffect(() => {
    const init = async () => {
      setGlobal((v) => ({ ...v, loading: true }));

      const res = await getList();
      console.log(res);

      if (res.status < 400) {
        setList([...res.data]);
      }

      setGlobal((v) => ({ ...v, loading: false }));
    };

    init();
  }, []);

  /* functions */
  const renderList = () => {
    // const filtered: scanResult[] = auth.isSignedIn
    //   ? list.filter((item) => auth.userData?.email === item.scanUserEmail)
    //   : [];
    const filtered: scanResult[] = auth.isSignedIn ? list : [];

    if (filtered.length === 0) {
      return (
        <Container sx={{ pt: '60px' }}>
          <Typography sx={{ textAlign: 'center' }}>nobody left the results in public.</Typography>
          <Typography sx={{ textAlign: 'center', p: 2 }}>
            <HourglassEmptyIcon fontSize="large" />
          </Typography>
        </Container>
      );
    }

    return (
      <Container sx={{ pt: '60px' }}>
        <Box sx={{ '& > *:not(:first-child)': { mt: 2 } }}>
          {list.map((item, index) => {
            return (
              <Button
                fullWidth
                sx={{
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'inherit',
                  textTransform: 'inherit',
                  justifyContent: 'flex-start',
                  p: 0,
                  textAlign: 'inherit',
                }}
                onClick={() => navigate(`/list/${item.scanID}`)}
              >
                <Box
                  sx={{
                    width: 88,
                    height: 70,
                    background: 'linear-gradient(135deg, rgba(255,0,0,1) 0%, rgba(197,0,255,1) 100%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ textAlign: 'center', fontWeight: 900, color: '#fafafa', p: 2 }} variant="body2">
                    {item.scanType}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    pl: 2,
                    height: 70,
                    fontFamily: 'Montserrat',
                    overflow: 'hidden',
                    boxShadow: '-4px 0 8px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    '& > *': { overflow: 'hidden', textOverflow: 'ellipsis' },
                  }}
                >
                  <Box>
                    {/* <Typography>{item.scanURL}</Typography> */}
                    <Typography sx={{ fontWeight: 500 }}>{item.inputURL}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 18, height: 18 }} />
                      <Typography variant="body2" sx={{ pl: 1, color: 'grey', fontSize: 12 }}>
                        {item.scanUserEmail}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Button>
            );
          })}
        </Box>
      </Container>
    );
  };

  /* renders */

  return <Box>{renderList()}</Box>;
};

export default ScannedList;
