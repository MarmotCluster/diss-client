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
  Checkbox,
  FormGroup,
  FormControlLabel,
  Switch,
  Tab,
} from '@mui/material';
import React, { FormEventHandler, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import useScan from '../../hooks/useSearch';
import { toast } from 'react-hot-toast';
import { getErrorMessage } from '../../utils';
import { useRecoilState } from 'recoil';
import { globalState } from '../../stores/global/atom';
import { useNavigate } from 'react-router-dom';
import XSSInjectionOnline from '../../components/XSSInjectionOnline';
import PathTraversalOnline from '../../components/PathTraversalOnline';
import axios from 'axios';
import { scanResultState } from '../../stores/scanResult/atom';
import OSCommandInjectionOnline from '../../components/OSCommandInjectionOnline';
import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';

type Http = 'http' | 'https';

const Home = () => {
  const navigate = useNavigate();

  const [global, setGlobal] = useRecoilState(globalState);
  const [result, setResult] = useRecoilState(scanResultState);

  const [http, setHttp] = useState<Http>('https');
  const [url, setUrl] = useState<string>('');
  const [permission, setPermission] = useState(false);
  const [scanType, setScanType] = useState<'xss' | 'traversal' | 'oscommand'>('xss');

  const { search } = useScan();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // console.log({ http, url });
    if (url.length > 0) {
      if (!permission) {
        toast('You must have permission to scan target site.', { icon: '⚠️' });
        return;
      }
      try {
        setGlobal((v) => ({ ...v, loading: true }));
        let res;
        switch (scanType) {
          case 'xss':
            res = await search.injection(`${http}://${url}`);
            break;
          case 'traversal':
            res = await search.traversal(`${http}://${url}`);
            break;
          case 'oscommand':
            res = await search.oscommand(`${http}://${url}`);
            break;
        }

        if (res.status >= 400) {
          toast.error(getErrorMessage(res.data));
        } else {
          setResult([...res.data]);
          navigate(`/result/${res.data.resultLink}`); // 응답 데이터는 resultLink로 리다이렉트할 링크를 전송하도록 임의 채택
        }
      } catch (err) {
      } finally {
        setGlobal((v) => ({ ...v, loading: false }));
      }
    }
  };

  const renderLogo = () => {
    switch (scanType) {
      case 'xss':
        return <XSSInjectionOnline />;
      case 'traversal':
        return <PathTraversalOnline />;
      case 'oscommand':
        return <OSCommandInjectionOnline />;
    }
  };

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
        <TabContext value={scanType}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(e, newValue) => setScanType(newValue)} sx={{ fontSize: 12 }}>
              <Tab label="xss" value="xss" />
              <Tab label="traversal" value="traversal" />
              <Tab label="oscommand" value="oscommand" />
            </TabList>
          </Box>
        </TabContext>
        <Box display="flex" alignItems="center" sx={{ mb: 8, textAlign: 'center' }}>
          {renderLogo()}
          {/* <Switch
            value={scanType}
            onChange={(e) => setScanType(e.target.checked)}
            sx={{ transform: 'rotate(90deg)' }}
          /> */}
        </Box>

        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 480,
            boxShadow: '0px 8px 20px rgba(0,0,0,0.18)',
            border: '1px solid #f4f4f4',
          }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <FormControl>
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
              onChange={(e) => setHttp(e.target.value as Http)}
              value={http}
            >
              <MenuItem value={'http'}>HTTP</MenuItem>
              <MenuItem value={'https'}>HTTPS</MenuItem>
            </Select>
          </FormControl>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <InputBase
            sx={{ ml: 1, flex: 1, fontFamily: 'Poppins', fontSize: 14, fontWeight: 700 }}
            placeholder="www.example.com/"
            inputProps={{ 'aria-label': 'www.example.com/' }}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <FormGroup sx={{ color: '#111' }}>
          <FormControlLabel
            control={<Checkbox value={permission} onChange={(e) => setPermission(e.target.checked)} />}
            label="i have permission to scan this site."
          />
        </FormGroup>
      </Box>
    </Container>
  );
};

export default Home;
