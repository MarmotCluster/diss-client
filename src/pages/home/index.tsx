import {
  Container,
  Typography,
  Box,
  Paper,
  IconButton,
  InputBase,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>Xss Online</Typography>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
          onSubmit={(e) => e.preventDefault()}
        >
          {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <FormControl>
            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Age"
              // onChange={handleChange}
              size="small"
              sx={{
                boxShadow: 'none',
                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                minWidth: 100,
                fontSize: 14,
                fontWeight: 700,
              }}
            >
              <MenuItem value={10}>HTTP</MenuItem>
              <MenuItem value={20}>HTTPS</MenuItem>
            </Select>
          </FormControl>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <InputBase
            sx={{ ml: 1, flex: 1, fontFamily: 'Poppins', fontSize: 14, fontWeight: 700 }}
            placeholder="www.example.com/"
            inputProps={{ 'aria-label': 'www.example.com/' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;
