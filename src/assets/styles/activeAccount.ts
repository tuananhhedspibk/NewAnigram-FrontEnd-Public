import {
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  BOX_SHADOWS_SYSTEM,
  FONT_FAMILIES,
  FONT_SIZES_SYSTEM,
  GREY_COLORS,
  PRIMARY_COLORS,
} from './systemDesignFactors';

export const activeAccountStyle = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: GREY_COLORS.Color100,
      width: '100%',
      height: '100vh',
    },
    circularProgress: {
      height: '60px !important',
      width: '60px !important',
    },
    content: {
      backgroundColor: BASIS_COLORS.White,
      boxShadow: BOX_SHADOWS_SYSTEM.Small,
      borderRadius: 10,
      fontFamily: FONT_FAMILIES.Base,
      fontSize: FONT_SIZES_SYSTEM.SmallTitle,
      margin: '40px auto',
      padding: 20,
      textAlign: 'center',
      width: 550,
    },
    icon: {
      height: 80,
      margin: '0 auto',
      width: 80,
    },
    failedIcon: {
      color: BASIS_COLORS.Red,
    },
    successIcon: {
      color: PRIMARY_COLORS.Color500,
    },
    link: {
      color: PRIMARY_COLORS.Color500,
      marginLeft: 5,
      marginRight: 5,
      textDecoration: 'none',
      '&:visited': {
        color: PRIMARY_COLORS.Color500,
      }
    },
  })
);
