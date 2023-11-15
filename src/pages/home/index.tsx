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
  FormLabel,
  RadioGroup,
  Radio,
  Tooltip,
  Grid,
} from '@mui/material';
import React, { FormEventHandler, useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import useScan from '../../hooks/useSearch';
import { toast } from 'react-hot-toast';
import { ResponseUsable, getErrorMessage } from '../../utils';
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
import { ScanTypes, XSSOption, XSSType } from '../../types';
import zIndex from '@mui/material/styles/zIndex';
import { authState } from '../../stores/auth/atom';
import SQLInjectionOnline from '../../components/SQLInjectionOnline';

type HttpHeader = 'http' | 'https';

const Home = () => {
  const navigate = useNavigate();

  /* stores */

  const [auth, setAuth] = useRecoilState(authState);

  const [global, setGlobal] = useRecoilState(globalState);

  const [result, setResult] = useRecoilState(scanResultState);

  /* states */

  const [open, setOpen] = useState(false);

  const [http, setHttp] = useState<HttpHeader>('https');

  const [url, setUrl] = useState<string>('');

  const [permission, setPermission] = useState(false);

  const [scanType, setScanType] = useState<ScanTypes>('XSS Injection');

  const [xssType, setXssType] = useState<XSSType>('reflection');

  const [xssOption, setXssOption] = useState<XSSOption>('fast');

  /* hooks */

  const { search } = useScan();

  /* functions */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.isSignedIn) return;

    if (url.length > 0) {
      if (!permission) {
        toast('You must have permission to scan target site.', { icon: '⚠️' });
        return;
      }
      try {
        setGlobal((v) => ({ ...v, loading: true }));
        let res: ResponseUsable;
        switch (scanType) {
          case 'XSS Injection':
            res = await search.injection(`${http}://${url}`, xssType, xssOption);
            break;
          case 'Path Traversal':
            res = await search.traversal(`${http}://${url}`);
            break;
          case 'OS Command Injection':
            res = await search.oscommand(`${http}://${url}`);
            break;
          case 'SQL Injection':
            res = await search.sqlinjection(`${http}://${url}`);
        }

        if (res!.status >= 400) {
          toast.error(getErrorMessage(res!.data));
        } else {
          navigate(`/result/${res!.data.resultLink}`);
          setResult([...res!.data]);
          // ... 응답 데이터는 resultLink로 리다이렉트할 링크를 전송하도록 임의 채택
        }
      } catch (err) {
      } finally {
        setGlobal((v) => ({ ...v, loading: false }));
      }
    }
  };

  /* renders */

  const renderLogo = () => {
    switch (scanType) {
      case 'XSS Injection':
        const renderXSSTypes = () => {
          const types: { [key in XSSType]: string } = {
            reflection: 'xss reflection',
            stored: 'xss stored',
          };

          return Object.keys(types).map((item, index) => (
            <Tooltip key={index} title={types[item as keyof typeof types]}>
              <FormControlLabel
                value={item}
                control={<Radio onChange={(e) => setXssType(item as XSSType)} />}
                label={item}
              />
            </Tooltip>
          ));
        };

        const renderOptions = () => {
          const options = {
            fast: 'able to reduce time scanning.',
            accurate: 'uses advanced solution. may takes long time.',
          };

          return Object.keys(options).map((item, index) => (
            <Tooltip key={index} title={options[item as keyof typeof options]}>
              <FormControlLabel
                value={item}
                control={<Radio onChange={(e) => setXssOption(item as XSSOption)} />}
                label={item}
              />
            </Tooltip>
          ));
        };
        return (
          <>
            <Box>
              <XSSInjectionOnline />
              <Grid container>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">type</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      value={xssType}
                    >
                      {renderXSSTypes()}
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">option</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      value={xssOption}
                    >
                      {renderOptions()}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
          </>
        );
      case 'Path Traversal':
        return <PathTraversalOnline />;
      case 'OS Command Injection':
        return <OSCommandInjectionOnline />;
      case 'SQL Injection':
        return <SQLInjectionOnline />;
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
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <TabList
              onChange={(e, newValue) => setScanType(newValue)}
              sx={{ fontSize: 12, maxWidth: 400 }}
              variant="scrollable"
            >
              {['XSS Injection', 'Path Traversal', 'OS Command Injection', 'SQL Injection'].map((item, index) => (
                <Tab key={index} label={item} value={item} />
              ))}
            </TabList>
          </Box>
        </TabContext>
        <Box display="flex" alignItems="center" sx={{ mb: 8, textAlign: 'center' }}>
          {renderLogo()}
        </Box>

        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            maxWidth: 480,
            width: '100%',
            boxShadow: '0px 8px 20px rgba(0,0,0,0.18)',
            border: '1px solid #f4f4f4',
            position: 'relative',
          }}
          onSubmit={(e) => handleSubmit(e)}
        >
          {!auth.isSignedIn && (
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                bgcolor: 'rgba(255,255,255,0.8)',
                top: 0,
                left: 0,
                zIndex: 1,
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0,
                transition: 'opacity .2s ease',
                userSelect: 'none',
                cursor: 'pointer',
                '&:hover': {
                  opacity: 1,
                },
              }}
              onClick={(e) => navigate('/login')}
            >
              <Typography variant="body2">You need to login to use our service.</Typography>
            </Box>
          )}
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
              onChange={(e) => setHttp(e.target.value as HttpHeader)}
              value={http}
              tabIndex={auth.isSignedIn ? undefined : -1}
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
            fullWidth
            tabIndex={auth.isSignedIn ? undefined : -1}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" tabIndex={auth.isSignedIn ? undefined : -1}>
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
