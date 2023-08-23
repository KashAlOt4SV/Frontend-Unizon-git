import React from 'react';
import styles from './EditProfile.module.scss';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from '../../axios'

export const EditProfile = ({
    avatarUrl,
    fullName,
}) => {

    const [TypeOfUser, setTypeOfUser] = React.useState('');
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
                                fullWidth />
                            </div>
                            <div className={styles.line}>
                                <hr/>
                            </div>
                        </div>
                        <div>
                            <div className={styles.field}>
                                e-mail
                            </div>
                            <div>
                                <TextField
                                className={styles.fieldButton}
                                label="E-Mail" 
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
                    </div>
                </div>
            </Grid>
            <Grid xs={4} item>
                <div className={styles.passwordEdit}>
                    <div className={styles.password}>
                        Изменить пароль
                    </div>
                    <TextField className={styles.oldPasswor} 
                    label="Старый пороль"
                    
                    fullWidth />
                    <TextField className={styles.oldPasswor} 
                    label="Новый пароль"
                    
                    fullWidth />
                    <TextField className={styles.oldPasswor} 
                    label="Подтвердите новый пароль"
                    
                    fullWidth />
                    <Button type='submit' size="large" variant="contained" fullWidth className={styles.submit}>
                        Сохранить
                    </Button>
                </div>
            </Grid>
        </Grid>
    )
}