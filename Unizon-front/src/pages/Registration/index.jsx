import React from 'react';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import axios from '../../axios'


import { styled } from '@mui/material/styles';

import {useForm} from "react-hook-form";
import { Navigate } from "react-router-dom";

import styles from './Login.module.scss';
import { fetchAuth, fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { purple, deepPurple } from '@mui/material/colors';

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
        interests: '',
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

if (TypeOfUser==='entrepreneur' && isAuth){
  return <Navigate to="/newProject" />
}

if (isAuth) {
  return <Navigate to="/" />
}


  console.log(TypeOfUser)


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
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', {required: 'Укажите ваше имя и фамилию!'})}
          className={styles.field} 
          label="Ваше имя и фамилия*" 
          fullWidth />
        <TextField 
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type = "email"
          {...register('email', {required: 'Укажите почту!'})}
          className={styles.field} 
          label="E-Mail*" 
          fullWidth />
        <TextField 
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type='password'
          {...register('password', {required: 'Укажите пароль!'})}
          className={styles.field} 
          label="Пароль*" 
          fullWidth />
        <TextField 
          error={Boolean(errors.interests?.message)}
          helperText={errors.interests?.message}
          {...register('interests', {required: 'Расскажите о себе хотя бы чуть-чуть!(мин. 10 символов)'})}
          className={styles.field} 
          label="Расскажите о себе*" 
          fullWidth />

        <select 
          error={Boolean(errors.TypeOfUser?.message)}
          helperText={errors.TypeOfUser?.message}
          {...register("TypeOfUser")} 
          className={styles.select}
          onChange={handleChange} 
          label={'Выбери свою роль*'}
          fullWidth>
          <option selected="selected" value="Инвестор">Я инвестор, ищу новые проекты </option>
          <option value="Предпринематель">Я предприниматель, у меня есть свой проект</option>
          <option value="Энтузиаст">Я энтузиаст, ищу себе команду </option>
          <option value="">Пока не определился</option>
        </select>

        <ColorButton className={styles.signButton} disabled = {!isValid} type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </ColorButton>
        
      </form>
    </Paper>
  );
};
