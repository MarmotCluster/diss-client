import { AxiosError } from 'axios';
import { useRecoilState } from 'recoil';
import API from '../configs/API';
import server from '../configs/server';
import { authState } from '../stores/auth/atom';
import { getResponseUsable, refresh, REST, tryCatchResponse } from '../utils';

export interface LoginProps {
  email: string;
  password: string;
}

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);

  const me = async (isCalledInAuthContext = false) => {
    const res = await refresh(REST.GET, API.USER.me, {});
    res.status === 200 &&
      isCalledInAuthContext &&
      setAuth((state) => ({ ...state, isSignedIn: true, userData: res.data }));
    return res;
  };

  const login = async ({ email, password }: LoginProps, remeberMe = false) => {
    try {
      const res = await server.post(API.AUTH.login, { email, password });

      window.localStorage.setItem('accessToken', res.data.access_token);
      if (remeberMe) {
        window.localStorage.setItem('refreshToken', res.data.refresh_token);
      }

      setAuth((state) => ({ ...state, isSignedIn: true }));

      return getResponseUsable(res);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) return getResponseUsable(err.response);
        return { status: 500, data: null };
      }
      return { status: 500, data: null };
    }
  };

  const logout = () => {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    setAuth((state) => ({ ...state, isSignedIn: false, userData: null }));
  };

  const register = async (form: { email: string; username: string; password: string; re_password: string }) => {
    const { email, username: name, password, re_password } = form;
    try {
      const res = await server.post(API.AUTH.register, { email, name, password, re_password });
      return getResponseUsable(res);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response) return getResponseUsable(err.response);
        return { status: 500, data: null };
      }
      return { status: 500, data: null };
    }
  };

  return { me, login, logout, register };
};

export default useAuth;
