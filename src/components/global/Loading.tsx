import { Box, Button, CircularProgress, Modal } from '@mui/material';
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { globalState } from '../../stores/global/atom';

const Loading = () => {
  const [global, setGlobal] = useRecoilState(globalState);
  const { loading, loadingComponent } = global;

  useEffect(() => {
    if (!loading) {
      setGlobal((v) => ({ ...v, loadingComponent: undefined }));
    }
  }, [loading]);

  return (
    <Modal open={loading}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          color: 'white',
        }}
      >
        <CircularProgress color="inherit" />
        {loadingComponent && <Box sx={{ mt: 3 }}>{loadingComponent()}</Box>}
      </Box>
    </Modal>
  );
};

export default Loading;
