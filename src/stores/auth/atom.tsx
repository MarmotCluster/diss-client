import { atom } from 'recoil';

export const authState = atom({
  key: 'authState',
  default: {
    isSignedIn: true,
    userData: null,
  },
});
