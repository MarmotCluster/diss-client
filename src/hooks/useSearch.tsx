import React from 'react';
import API from '../configs/API';
import server from '../configs/server';
import { getResponseUsable, refresh, REST, tryCatchResponse } from '../utils';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { globalState } from '../stores/global/atom';
import { Button } from '@mui/material';

type SearchType = 'injection' | 'traversal';

const useScan = () => {
  const [global, setGlobal] = useRecoilState(globalState);

  const source = axios.CancelToken.source();

  const setCancelComponent = () => {
    setGlobal((v) => ({
      ...v,
      loadingComponent: () => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              cancelSearchRequest();
              setGlobal((state) => ({ ...state, loading: false }));
            }}
          >
            Cancel
          </Button>
        );
      },
    }));
  };

  const search = {
    injection: async (url: string) => {
      setCancelComponent();
      return await tryCatchResponse(async () => {
        const res = await refresh(REST.POST, API.scan, { data: { href: url }, cancelToken: source.token });
        return getResponseUsable(res);
      });
    },
    traversal: async (url: string) => {
      setCancelComponent();
      return await tryCatchResponse(async () => {
        const res = await refresh(REST.POST, API.scan2, { data: { href: url }, cancelToken: source.token });
        return getResponseUsable(res);
      });
    },
    oscommand: async (url: string) => {
      setCancelComponent();
      return await tryCatchResponse(async () => {
        const res = await refresh(REST.POST, API.scan3, { data: { href: url }, cancelToken: source.token });
        return getResponseUsable(res);
      });
    },
  };

  const cancelSearchRequest = () => {
    source.cancel('Canceled.');
  };

  return { search, cancelSearchRequest };
};

export default useScan;
