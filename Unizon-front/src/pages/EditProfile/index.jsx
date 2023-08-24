import React from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import {useForm} from "react-hook-form";

import styles from './EditProfile.module.scss';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from '../../axios'
import { fetchSwitchPassword } from "../../redux/slices/auth";

export const EditProfile = ({
}) => {
    const location = useLocation()

    const  avatarUrl  = location.state.itemsOfUser.avatarUrl
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [typeOfUser, setTypeOfUser] = React.useState(location.state.itemsOfUser.typeOfUser);
    const [email, setEmail] = React.useState(location.state.itemsOfUser.email);
    const [fullName, setFullName] = React.useState(location.state.itemsOfUser.fullName.fullName);
    const [interests, setInterests] = React.useState(location.state.itemsOfUser.interests);

    const inputFileRef = React.useRef(null);
    const [imageUrl, setImageUrl] = React.useState('');

    const handleChangeFile = async(event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      const { avatarUrl } = await axios.patch('/updateAvatar', avatarUrl);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла!')
    }
    };

    const onClickRemoveImage = () => {
    setImageUrl('');
  };

    const { register, 
    handleSubmit,
    formState: {errors, isValid},
  } = useForm( {
      defaultValues: {
        oldPassword: '',
        newPassword: '',
        newPasswordVal: '',
      },
      mode: 'all',
  });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchSwitchPassword(values));

        if (!data.payload) {
            return alert('Не удалось сменить пароль');
        }

        else  {
            return alert("Пароль изменен!")
        }
}
  const handleChange = (event) => {
    setTypeOfUser(event.target.value);
  };

    return (
        <Grid container spacing={4}>
            <Grid xs={8} item>
                <div>
                    <div className={styles.titleOfPage}>
                        Редактирование профиля
                    </div>
                    <div className={styles.root}>
                        <div>
                            <img className={styles.avatar} src={avatarUrl ? `http://localhost:5555${avatarUrl}` : '/noavatar.png'} alt={fullName}/>
                            <Button onClick = {() => inputFileRef.current.click()} variant="outlined" size="large" className={styles.uploadButton}>
                                Загрузить аватар
                            </Button>
                            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
                            {imageUrl && (
                                <>
                                <Button onClick = {() => inputFileRef.current.click()} variant="outlined" size="large" className={styles.uploadButton}>
                                    Изменить аватар
                                </Button>
                                <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
                                <Button variant="contained" color="error" onClick={onClickRemoveImage} className={styles.delete}>
                                    Удалить мать
                                </Button>
                                <img className={styles.image} src={`http://localhost:5555${imageUrl}`} alt="Uploaded" />
                                </>
                            )}
                        </div>
                        <div className={styles.line}>
                            <hr/>
                        </div>
                        <div>
                            <div className={styles.field}>
                                Имя и фамилия
                            </div>
                            <div>
                                <TextField
                                className={styles.fieldButton} 
                                label="Ваше имя и фамилия" 
                                defaultValue={fullName}
                                fullWidth />
                            </div>
                            <div className={styles.line}>
                                <hr/>
                            </div>
                        </div>
                        <div>
                            <div className={styles.field}>
                                E-mail
                            </div>
                            <div>
                                <TextField
                                className={styles.fieldButton}
                                label="E-Mail"
                                defaultValue={email}
                                fullWidth />
                            </div>
                        </div>
                        <div className={styles.line}>
                            <hr/>
                        </div>
                        <div>
                            <div className={styles.field}>
                                О себе
                            </div>
                            <div>
                                <TextField
                                className={styles.fieldButton} 
                                label="Расскажите о себе" 
                                defaultValue={interests}
                                fullWidth />
                            </div>
                        </div>
                        <div className={styles.line}>
                            <hr/>
                        </div>
                        <div>
                            <div className={styles.field}>
                                Моя роль
                            </div>
                            <div>
                                <select 
                                    className={styles.select}
                                    onChange={handleChange} 
                                    label={'Выбери свою роль*'}
                                    defaultValue={typeOfUser}
                                    fullWidth>
                                    <option selected="selected" value="investor">Я Инвестор, ищу новые проекты </option>
                                    <option value="entrepreneur">Я предприниматель, у меня есть свой проект</option>
                                    <option value="enthusiast">Я энтузиаст, ищу себе команду </option>
                                    <option value="idk">Пока не определился</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.line}>
                            <hr/>
                        </div>
                        <div className={styles.submitMain}>
                            <Button type='submit' size="large" variant="contained" fullWidth className={styles.submit}>
                                Сохранить
                            </Button>
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid xs={4} item>
                <div className={styles.passwordEdit}>
                    <div className={styles.password}>
                        Изменить пароль
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField className={styles.oldPasswor} 
                        label="Старый пароль"
                        error={Boolean(errors.oldPassword?.message)}
                        helperText={errors.oldPassword?.message}
                        {...register('oldPassword', {required: 'Укажите ваш старый пароль!'})}
                        fullWidth />
                        <TextField className={styles.oldPasswor} 
                        label="Новый пароль"
                        error={Boolean(errors.newPassword?.message)}
                        helperText={errors.newPassword?.message}
                        {...register('newPassword', {required: 'Укажите ваш новый пароль!'})}
                        fullWidth />
                        <TextField className={styles.oldPasswor} 
                        label="Подтвердите новый пароль"
                        error={Boolean(errors.newPasswordVal?.message)}
                        helperText={errors.newPasswordVal?.message}
                        {...register('newPasswordVal', {required: 'Подтвердите ваш новый пароль!'})}
                        fullWidth />
                        <Button disabled={!isValid} type='submit' size="large" variant="contained"  fullWidth className={styles.submit}>
                            Сохранить
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}