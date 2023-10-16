import React, { useEffect, useState } from 'react';
import useSearch from '../../hooks/useSearch';
import { useRecoilState } from 'recoil';
import { globalState } from '../../stores/global/atom';
import { Avatar, Box, Container, Typography } from '@mui/material';

import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { authState } from '../../stores/auth/atom';

const ScannedList = () => {
  /* stores */
  const [global, setGlobal] = useRecoilState(globalState);

  const [auth, setAuth] = useRecoilState(authState);

  /* hooks */
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

      if (res.status === 200) {
        setList([...res.data]);
      }

      setGlobal((v) => ({ ...v, loading: false }));
    };

    init();
  }, []);

  /* functions */
  const renderList = () => {
    const filtered: scanResult[] = auth.isSignedIn
      ? list.filter((item) => auth.userData?.email === item.scanUserEmail)
      : [];

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
              <Box
                sx={{
                  borderRadius: 4,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 88,
                    height: 64,
                    bgcolor: 'red',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography sx={{ textAlign: 'center', fontWeight: 900, color: '#fafafa' }} variant="body2">
                    {item.scanType}
                  </Typography>
                </Box>
                <Box sx={{ pl: 2, overflow: 'hidden', '& > *': { overflow: 'hidden', textOverflow: 'ellipsis' } }}>
                  <Typography>{item.scanURL}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ width: 18, height: 18 }} />
                    <Typography variant="body2" sx={{ pl: 1, color: 'grey' }}>
                      {item.scanUserEmail}
                    </Typography>
                  </Box>
                </Box>
              </Box>
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
