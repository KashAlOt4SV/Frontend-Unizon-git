import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import RecentActorsIcon from '@mui/icons-material/RecentActors';

import styles from './SideBar.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {selectIsAuth, logout, UserID } from "../../redux/slices/auth";
import { purple } from '@mui/material/colors';
import { useLocation } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const SideBar = () => {
    const isAuth = useSelector(selectIsAuth)
    const dispatch = useDispatch();
    const userData = useSelector(state => state.auth.data);
    const location = useLocation();

    console.log(location);

    const onClickLogout = () => {
        if (window.confirm('Вы уверены что хотите выйти?')){
        dispatch(logout());
        window.localStorage.removeItem('token')
        }
    };


    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const color = purple[100];
    const colorButton = '#a42eff'; 
    const grey = '#757575';

    return (
        <Box >
        <CssBaseline />
        <AppBar position="fixed" open={open} sx={{backgroundColor: color, maxHeight: 64}}>
            <Toolbar >
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <Link to = '/' className={styles.logo} >
              <Typography variant="h6" noWrap component="div">
                  Unizon
              </Typography>
            </Link>
            <div className={styles.root}>
            <Container maxWidth={'xl'}>
                <div className={styles.inner}>
                <div className={styles.buttons}>
                    {isAuth ? (
                    <>
                        <Link to="/add-post"  className={styles.DoPost}>
                        <Button variant="contained" sx={{backgroundColor: colorButton}}>Написать статью</Button>
                        </Link>
                        <Link to={`/user-page/${userData._id}`}>
                        <Button variant="contained" sx={{backgroundColor: colorButton}}>Мой профиль</Button>
                        </Link>
                        <Link to = "/">
                        <Button onClick={onClickLogout} variant="contained" color="error">
                            Выйти
                        </Button>
                        </Link>
                        
                    </>
                    ) : (
                    <>
                        <Link to="/login">
                        <Button variant="contained" sx={{backgroundColor: colorButton}}>Войти</Button>
                        </Link>
                        <Link to="/register">
                        <Button variant="contained" sx={{backgroundColor: colorButton}}>Создать аккаунт</Button>
                        </Link>
                    </>
                    )}
                </div>
                </div>
            </Container>
            </div>
            </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
            <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
            {['Главная', 'Мой проект', 'Друзья', 'Сообщения', 'Вакансии', 'Проекты'].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                  {index === 0 ? <Link to = '/' ></Link> : null}
                  {index === 1 ? <Link to = '/myProject'></Link> : null}
                  {index === 2 ? <Link to = '/friends'></Link> : null}
                  {index === 3 ? <Link to = '/messages'></Link> : null}
                  {index === 4 ? <Link to = '/vacancy'></Link> : null}
                  {index === 5 ? <Link to = '/projects'></Link> : null}
                <ListItemButton
                    sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                    }}
                >
                    <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                    }}
                    >
                    {index === 0 ? <Link to = '/' ><HomeIcon sx={location.pathname === '/' ? {color: colorButton} : {color: grey}}/></Link> : null}
                    {index === 1 ? <Link to = '/myProject'><GroupsIcon sx={location.pathname === '/myProject' ? {color: colorButton} : {color: grey}}/></Link> : null}
                    {index === 2 ? <Link to = '/friends'><GroupIcon sx={location.pathname === '/friends' ? {color: colorButton} : {color: grey}}/></Link> : null}
                    {index === 3 ? <Link to = '/messages'><ForumIcon sx={location.pathname === '/messages' ? {color: colorButton} : {color: grey}}/></Link> : null}
                    {index === 4 ? <Link to = '/vacancy'><RecentActorsIcon sx={location.pathname === '/vacancy' ? {color: colorButton} : {color: grey}}/></Link> : null}
                    {index === 5 ? <Link to = '/projects'><ReceiptLongIcon sx={location.pathname === '/projects' ? {color: colorButton} : {color: grey}}/></Link> : null}
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </ListItem>
            ))}
            </List>
            <Divider />
            
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
        </Box>
        </Box>
    );
}