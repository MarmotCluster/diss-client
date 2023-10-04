import { Avatar, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import zIndex from '@mui/material/styles/zIndex';
import React, { useEffect, useState } from 'react';

import { Link as RouterLink } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { globalState } from '../../stores/global/atom';
import { authState } from '../../stores/auth/atom';

import MainLogo from '../MainLogo';
import PopupMenu from '../header/PopupMenu';
import LoginIcon from '@mui/icons-material/Login';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';

const Header = () => {
  /* recoils */
  const [auth, setAuth] = useRecoilState(authState);
  const [global, setGlobal] = useRecoilState(globalState);

  /* states */
  const [shadow, setShadow] = useState(false);

  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  /* dynamic constants */
  const id = anchor ? 'simple-popover' : undefined;

  useEffect(() => {
    const handleScroll = (e: Event) => {
      // console.log(window.pageYOffset);
      if (window.pageYOffset > 0) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shadow]);

  return (
    <>
      <Box
        sx={{
          bgcolor: 'white',
          width: '100%',
          height: 60,
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: zIndex.appBar,
          px: 2,
          transition: 'box-shadow .2s ease',
          boxShadow: shadow ? '0px 4px 20px rgba(0,0,0,0.16)' : undefined,
        }}
      >
        <Grid container height="100%" alignItems="center" justifyContent="space-between">
          <Grid item>
            <Button component={RouterLink} to="/">
              <MainLogo sx={{ fontSize: 18 }} />
            </Button>
            <Button component={RouterLink} to="/list" startIcon={<FeaturedPlayListIcon />}>
              Lists
            </Button>
          </Grid>
          {!auth.isSignedIn && (
            <Grid item>
              <Button component={RouterLink} to="/login" startIcon={<LoginIcon />}>
                Sign in
              </Button>
            </Grid>
          )}
          {auth.isSignedIn && (
            <Grid item>
              <IconButton aria-describedby={id} onClick={(e) => setAnchor(e.currentTarget)}>
                <Avatar />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Box>
      <PopupMenu id={id} anchorState={[anchor, setAnchor]} />
    </>
  );
};

export default Header;
