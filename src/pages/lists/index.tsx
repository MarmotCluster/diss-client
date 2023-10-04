import React, { useEffect, useState } from 'react';
import useSearch from '../../hooks/useSearch';
import { useRecoilState } from 'recoil';
import { globalState } from '../../stores/global/atom';
import { Box, Container, Typography } from '@mui/material';

import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const ScannedList = () => {
  /* stores */
  const [global, setGlobal] = useRecoilState(globalState);

  /* hooks */
  const { getList } = useSearch();

  /* states */
  const [list, setList] = useState<unknown[]>([]);

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
  }, []);

  /* functions */
  const renderList = () => {
    if (list.length === 0) {
      return (
        <Container sx={{ pt: '60px' }}>
          <Typography sx={{ textAlign: 'center' }}>nobody left the results in public.</Typography>
          <Typography sx={{ textAlign: 'center', p: 2 }}>
            <HourglassEmptyIcon fontSize="large" />
          </Typography>
        </Container>
      );
    }

    return <Box>ss</Box>;
  };

  /* renders */

  return <Box>{renderList()}</Box>;
};

export default ScannedList;
