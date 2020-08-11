import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  BOX_SHADOWS_SYSTEM,
  FONT_FAMILIES,
  FONT_SIZES_SYSTEM,
  GREY_COLORS,
} from './systemDesignFactors';

export const authStyle = makeStyles((theme: Theme) =>
  createStyles({
    author: {
      color: GREY_COLORS.Color500,
      fontFamily: FONT_FAMILIES.Base,
      marginBottom: 33,
      marginTop: 3,
      textAlign: 'center',
    },
    authorName: {
      color: GREY_COLORS.Color500,
      marginLeft: 7,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    body: {
      fontFamily: theme.typography.fontFamily,
      paddingTop: 50,
    },
    bottomBox: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 35,
      width: '100%',
    },
    button: {
      color: BASIS_COLORS.White,
      float: 'right',
      textTransform: 'none',
      width: 90,
    },
    card: {
      boxShadow: BOX_SHADOWS_SYSTEM.Normal,
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: 360,
      padding: '30px 45px 60px 45px',
      textAlign: 'center',
    },
    circularProgress: {
      color: 'hsla(0, 0%, 100%, 1) !important',
      height: '30px !important',
      width: '30px !important',
    },
    input: {
      marginTop: 10,
      width: '100%',
    },
    link: {
      cursor: 'pointer',
      float: 'left',
      fontFamily: FONT_FAMILIES.Base,
    },
    title: {
      color: GREY_COLORS.Color700,
      fontFamily: FONT_FAMILIES.Title,
      fontSize: FONT_SIZES_SYSTEM.HugeTitle,
      marginBottom: 0,
      marginTop: 0,
      textAlign: 'center',
    },
    topBox: {
      display: 'inline-block',
      width: '100%',
    },
  })
);
