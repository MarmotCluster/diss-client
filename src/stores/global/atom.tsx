import React from 'react';
import { atom } from 'recoil';

export const globalState = atom<{ loading: boolean; loadingComponent?: () => JSX.Element }>({
  key: 'globalState',
  default: {
    loading: false,
    loadingComponent: undefined,
  },
});
