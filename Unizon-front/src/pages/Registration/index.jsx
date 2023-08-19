import React from 'react';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';


import { styled } from '@mui/material/styles';

import {useForm} from "react-hook-form";
import { Navigate } from "react-router-dom";

import styles from './Login.module.scss';
import { fetchAuth, fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { purple, deepPurple } from '@mui/material/colors';
import { NativeSelect } from '@mui/material';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();
  const [TypeOfUser, setTypeOfUser] = React.useState('');

  const handleChange = (event) => {
    setTypeOfUser(event.target.value);
  };
  const { register, 
    handleSubmit,
    formState: {errors, isValid},
  } = useForm( {
      defaultValues: {
        fullName: '',
        email: '',
        password: '',
        TypeOfUser: '',
      },
      mode: 'all',
  });

  const onSubmit = async (values) => {
  const data = await dispatch(fetchRegister(values));

  if (!data.payload) {
    return alert('Не удалось зарегестрироваться');
  }

  if ('token' in data.payload) {
    window.localStorage.setItem('token', data.payload.token);
  }
}
if (isAuth) {
  return <Navigate to="/" />
}
  console.log(TypeOfUser)
 
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#a42eff'),
  backgroundColor: '#a42eff',
  '&:hover': {
    backgroundColor: purple[700],
  },
}));

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', {required: 'Укажите ваше имя и фамилию!'})}
          className={styles.field} 
          label="Ваше имя и фамилия" 
          fullWidth />
        <TextField 
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type = "email"
          {...register('email', {required: 'Укажите почту!'})}
          className={styles.field} 
          label="E-Mail" 
          fullWidth />
        <TextField 
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type='password'
          {...register('password', {required: 'Укажите пароль!'})}
          className={styles.field} 
          label="Пароль" 
          fullWidth />

        <select 
          error={Boolean(errors.TypeOfUser?.message)}
          helperText={errors.TypeOfUser?.message}
          {...register("TypeOfUser")} 
          className={styles.select}
          onChange={handleChange} 
          label={'Выбери свою роль'}
          placeholder='Выберите свою роль'
          fullWidth>
          <option value="investor">Я инвестор, ищу новые проекты </option>
          <option value="entrepreneur">Я предприниматель, у меня есть свой проект</option>
          <option value="enthusiast">Я энтузиаст, ищу себе команду </option>
          <option value="idk">Я сторонний наблюдатель</option>
        </select>

        <ColorButton className={styles.signButton} disabled = {!isValid} type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </ColorButton>
        
      </form>
    </Paper>
  );
};
