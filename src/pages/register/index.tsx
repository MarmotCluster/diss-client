import React, { useState } from 'react';
import { Button, Card, CardContent, Container, Grid, Link, TextField, Typography } from '@mui/material';
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

interface RegisterProps {
  email: string;
  username: string;
  password: string;
  re_password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().required(),
  username: Yup.string().required(),
  password: Yup.string().required(),
  re_password: Yup.string()
    .required('Field should be filled.')
    .oneOf([Yup.ref<string>('password')], 'Field should be same with password.'),
});

const Register = () => {
  const navigate = useNavigate();

  const [global, setGlobal] = useRecoilState(globalState);

  const { register } = useAuth();
  const simpler = useConvenience();

  const [form, setForm] = useState<RegisterProps>({ email: '', username: '', password: '', re_password: '' });
  const [error, setError] = useState<RegisterProps>({
    email: '',
    username: '',
    password: '',
    re_password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setError({
        email: '',
        username: '',
        password: '',
        re_password: '',
      });
      schema.validateSync(form, { abortEarly: false });

      setGlobal((v) => ({ ...v, loading: true }));
      const res = await register(form);

      simpler.showToastError(res, () => navigate('/login'));
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = getYupErrorMessages(err);
        const { email = '', username = '', password = '', re_password = '' } = errorMessages;
        const registerProps = { email, username, password, re_password };
        setError(registerProps);
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
                <Typography>Register</Typography>
              </Grid>
              {['email', 'username', 'password', 're_password'].map((item, index) => {
                return (
                  <Grid key={index} item>
                    <TextField
                      fullWidth
                      id={item}
                      name={item}
                      placeholder={
                        {
                          email: 'example@gmail.com',
                          username: 'JohenDoe',
                          password: 'Password',
                          re_password: 'Confirm Password',
                        }[item]
                      }
                      size="small"
                      type={
                        {
                          email: 'email',
                          name: 'text',
                          password: 'password',
                          re_password: 'password',
                        }[item]
                      }
                      onChange={(e) => setForm((state) => ({ ...state, [item]: e.target.value }))}
                      error={error[item as keyof RegisterProps].length > 0}
                      helperText={error[item as keyof RegisterProps]}
                    />
                  </Grid>
                );
              })}
              <Grid item>
                <Button variant="contained" fullWidth type="submit">
                  Register
                </Button>
              </Grid>
              <Grid item>
                <Grid container spacing={1} justifyContent="center">
                  <Grid item>
                    <Typography>Already a member?</Typography>
                  </Grid>
                  <Grid item>
                    <Link component={RouterLink} to="/login">
                      Sign in
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

export default Register;
