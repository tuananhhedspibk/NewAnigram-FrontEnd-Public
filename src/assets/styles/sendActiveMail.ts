import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import {
  FONT_FAMILIES,
  FONT_SIZES_SYSTEM,
  GREY_COLORS,
  PRIMARY_COLORS,
} from './systemDesignFactors';

export const sendActiveMailStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: GREY_COLORS.Color100,
      width: '100%',
      height: '100vh',
    },
    attention: {
      alignItems: 'center',
      display: 'flex',
      fontSize: FONT_SIZES_SYSTEM.Normal,
      justifyContent: 'center',
    },
    content: {
      fontFamily: FONT_FAMILIES.Base,
      marginTop: 40,
      textAlign: 'center',
    },
    button: {
      backgroundColor: GREY_COLORS.Color100,
      border: 'none',
      color: PRIMARY_COLORS.Color500,
      cursor: 'pointer',
      fontFamily: FONT_FAMILIES.Base,
      fontSize: FONT_SIZES_SYSTEM.Normal,
      textDecoration: 'underline',
      outline: 'none',
    },
    icon: {
      color: PRIMARY_COLORS.Color500,
      marginRight: 8,
    },
    mailIcon: {
      bottom: 0,
      fontSize: FONT_SIZES_SYSTEM.HugeTitle,
      left: 40,
      marginRight: 0,
      position: 'absolute',
    },
    sendIcon: {
      fontSize: FONT_SIZES_SYSTEM.HyperHugeTitle,
      marginRight: 0,
      transform: 'rotate(-20deg)',
    },
    symbolIcons: {
      display: 'inline-block',
      paddingTop: 10,
      position: 'relative',
      margin: '0 auto',
    },
    text: {
      display: 'inline-block',
      margin: 0,
    },
    title: {
      fontSize: FONT_SIZES_SYSTEM.TinyTitle,
      marginBottom: 15,
    },
  })
);
