import { Box, CircularProgress, Modal } from '@mui/material';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { globalState } from '../../stores/global/atom';

const Loading = () => {
  const { loading } = useRecoilValue(globalState);

  return (
    <Modal open={loading}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          color: 'white',
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    </Modal>
  );
};

export default Loading;
