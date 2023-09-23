import React from 'react';
import API from '../configs/API';
import server from '../configs/server';
import { getResponseUsable, refresh, REST, tryCatchResponse } from '../utils';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { globalState } from '../stores/global/atom';
import { Button, useTheme } from '@mui/material';
import { XSSOption, XSSType } from '../types';

type SearchType = 'injection' | 'traversal';

const useScan = () => {
  const [global, setGlobal] = useRecoilState(globalState);

  const source = axios.CancelToken.source();

  const theme = useTheme();

  const setCancelComponent = () => {
    setGlobal((v) => ({
      ...v,
      loadingComponent: () => {
        return (
          <Button
            variant="contained"
            color={'inherit'}
            sx={{ color: theme.palette.primary.main }}
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
    injection: async (url: string, type: XSSType, option: XSSOption) => {
      setCancelComponent();
      return await tryCatchResponse(async () => {
        const res = await refresh(REST.POST, API.scan, {
          data: { href: url, type, option },
          cancelToken: source.token,
        });
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

  const getResult = async (postId: number) => {
    return await tryCatchResponse(async () => {
      const res = await refresh(REST.GET, API.SEARCH.result + `/${postId}`, {});
      return getResponseUsable(res);
    });
  };

  return { search, cancelSearchRequest, getResult };
};

export default useScan;
