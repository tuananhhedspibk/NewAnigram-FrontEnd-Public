import { makeStyles, Theme, createStyles, fade } from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  BOX_SHADOWS_SYSTEM,
  FONT_FAMILIES,
  FONT_SIZES_SYSTEM,
  PRIMARY_COLORS,
} from './systemDesignFactors';

export const appBarStyle = makeStyles((theme: Theme) =>
  createStyles({
    appBarRoot: {
      color: BASIS_COLORS.White,
    },
    buttonAsLink: {
      backgroundColor: BASIS_COLORS.White,
      border: 'none',
      color: PRIMARY_COLORS.Color500,
      cursor: 'pointer',
      fontSize: FONT_SIZES_SYSTEM.Normal,
      '&:hover': {
        textDecoration: 'underline',
      },
      '&:focus': {
        outline: 'none',
      },
      padding: 0,
    },
    customIcon: {
      color: PRIMARY_COLORS.Color500,
      fontSize: FONT_SIZES_SYSTEM.StandardTitle,
    },
    grow: {
      flexGrow: 1,
    },
    homeLink: {
      color: BASIS_COLORS.White,
      fontFamily: FONT_FAMILIES.Title,
      fontSize: FONT_SIZES_SYSTEM.StandardTitle,
      '&:hover': {
        textDecoration: 'none',
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    link: {
      color: PRIMARY_COLORS.Color500,
      float: 'right',
      fontSize: FONT_SIZES_SYSTEM.Normal,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    menuHeader: {
      boxShadow: BOX_SHADOWS_SYSTEM.Small,
      fontFamily: theme.typography.fontFamily,
      marginTop: '-8px',
      padding: '13px 15px 13px 15px',
    },
    menuItem: {
      paddingLeft: 1,
    },
    notificationsWrapper: {
      maxHeight: 350,
      overflowY: 'scroll',
    },
    placeholderItem: {
      display: 'inline-block',
      textAlign: 'center',
    },
    placeholderText: {
      margin: '6px 0',
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  }),
);
