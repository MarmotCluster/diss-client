import React from 'react';
import API from '../configs/API';
import server from '../configs/server';
import { getResponseUsable, refresh, REST, tryCatchResponse } from '../utils';

type SearchType = 'injection' | 'traversal';

const useScan = () => {
  const search = {
    injection: async (url: string) => {
      return await tryCatchResponse(async () => {
        const res = await refresh(REST.POST, API.scan, { data: { href: url } });
        return getResponseUsable(res);
      });
    },
    traversal: async (url: string) => {
      return await tryCatchResponse(async () => {
        const res = await refresh(REST.POST, API.scan2, { data: { href: url } });
        return getResponseUsable(res);
      });
    },
  };

  return { search };
};

export default useScan;
