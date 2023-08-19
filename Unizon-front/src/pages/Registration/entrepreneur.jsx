import React from 'react';
import { Link } from "react-router-dom";

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
import { fetchNewProject } from "../../redux/slices/projects";
import { selectIsAuth } from "../../redux/slices/auth";

import { purple, deepPurple } from '@mui/material/colors';

export const NewProject= () => {
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
        aboutProject: '',
        command: '',
        InfoInNumber: '',
      },
      mode: 'all',
  });

  const onSubmit = async (values) => {
  const data = await dispatch(fetchNewProject(values));

  if (!data.payload) {
    return alert('Не удалось создать проект');
  }

  if ('token' in data.payload) {
    window.localStorage.setItem('token', data.payload.token);
  }
}


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
        Создание вашего проекта
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.aboutProject?.message)}
          helperText={errors.aboutProject?.message}
          {...register('aboutProject', {required: 'Расскажите о вашем проекте'})}
          className={styles.field} 
          label="Расскажите о вашем проекте" 
          fullWidth />
        <TextField 
          error={Boolean(errors.command?.message)}
          helperText={errors.command?.message}
          {...register('command', {required: 'Расскажите о вашей команде!'})}
          className={styles.field} 
          label="Расскажите о вашей команде" 
          fullWidth />
        <TextField 
          error={Boolean(errors.InfoInNumber?.message)}
          helperText={errors.InfoInNumber?.message}
          {...register('InfoInNumber', {required: 'Расскажите информацию в цифрах!'})}
          className={styles.field} 
          label='Расскажите информацию в "цифрах" '
          fullWidth />

        <ColorButton className={styles.signButton} disabled = {!isValid} type='submit' size="large" variant="contained" fullWidth>
          <Link className={styles.signButtonLink} to="/">
            Добавить свой проект
          </Link>
        </ColorButton>
        
      </form>
    </Paper>
  );
};
