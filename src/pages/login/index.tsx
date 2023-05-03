import { Button, Card, CardContent, Container, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useAuth, { LoginProps } from '../../hooks/useAuth';
import * as Yup from 'yup';
import { getYupErrorMessages } from '../../utils';
import { toast } from 'react-hot-toast';
import useConvenience from '../../hooks/useConvenience';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { styleCardDefault } from '../../styles';
import { useRecoilState } from 'recoil';
import { globalState } from '../../stores/global/atom';

const schema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

const Login = () => {
  const navigate = useNavigate();

  const [global, setGlobal] = useRecoilState(globalState);

  const { login } = useAuth();
  const simpler = useConvenience();

  const [form, setForm] = useState<LoginProps>({ email: '', password: '' });
  const [error, setError] = useState<LoginProps>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError({
        email: '',
        password: '',
      });
      schema.validateSync(form, { abortEarly: false });

      setGlobal((v) => ({ ...v, loading: true }));
      const res = await login(form);
      simpler.showToastError(res, () => navigate('/'));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = getYupErrorMessages(err);
        const { email = '', password = '' } = errorMessages;
        const loginProps = { email, password };
        setError(loginProps);
      }
    } finally {
      setGlobal((v) => ({ ...v, loading: false }));
    }
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ ...styleCardDefault, width: 500 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container flexDirection="column" sx={{ '& > *:not(:last-child)': { mb: 2 } }}>
              <Grid item>
                <Typography>Sign in</Typography>
              </Grid>
              {['email', 'password'].map((item, index) => {
                return (
                  <Grid key={index} item>
                    <TextField
                      fullWidth
                      id={item}
                      name={item}
                      placeholder={item}
                      size="small"
                      type={item === 'password' ? 'password' : 'email'}
                      onChange={(e) => setForm((state) => ({ ...state, [item]: e.target.value }))}
                      error={error[item as keyof LoginProps].length > 0}
                      helperText={error[item as keyof LoginProps]}
                    />
                  </Grid>
                );
              })}
              <Grid item>
                <Button variant="contained" fullWidth type="submit">
                  Log in
                </Button>
              </Grid>
              <Grid item>
                <Grid container spacing={1} justifyContent="center">
                  <Grid item>
                    <Typography>Have no Account?</Typography>
                  </Grid>
                  <Grid item>
                    <Link component={RouterLink} to="/register">
                      Register
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
