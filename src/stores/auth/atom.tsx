import { RecoilState, atom } from 'recoil';

type AuthState = {
  isSignedIn: boolean;
  userData: {
    email?: string | null;
  };
};

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isSignedIn: true,
    userData: {
      email: 'temp@temp.com',
    },
  },
});
