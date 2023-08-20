import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {selectIsAuth, logout  } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";

export const Header = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm('Вы уверены что хотите выйти?')){
      dispatch(logout());
      window.localStorage.removeItem('token')
    }
};

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>Unizon</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post"  className={styles.DoPost}>
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Link to="/user-page">
                  <Button variant="contained">Мой профиль</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
