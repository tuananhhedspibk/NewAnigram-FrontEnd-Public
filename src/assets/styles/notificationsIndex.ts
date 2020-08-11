import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  BOX_SHADOWS_SYSTEM,
  FONT_SIZES_SYSTEM,
  GREY_COLORS,
  PRIMARY_COLORS,
} from './systemDesignFactors';

export const notitifcationsIndexStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: GREY_COLORS.Color100,
      padding: '30px 0',
      minHeight: 'calc(100vh - 64px)',
    },
    buttonAsLink: {
      backgroundColor: GREY_COLORS.Color100,
      border: 'none',
      color: PRIMARY_COLORS.Color500,
      cursor: 'pointer',
      fontSize: FONT_SIZES_SYSTEM.Normal,
      '&:focus': {
        outline: 'none',
      },
      margin: '0 auto 20px auto',
      padding: 0,
    },
    buttonWrapper: {
      textAlign: 'center',
    },
    content: {
      fontFamily: theme.typography.fontFamily,
      margin: '0 auto',
      width: '80%',
    },
    circularProgress: {
      marginTop: 10,
    },
    circularProgressWrapper: {
      margin: 0,
      textAlign: 'center',
    },
    hideCard: {
      display: 'none',
    },
    notifiCard: {
      boxShadow: BOX_SHADOWS_SYSTEM.Tiny,
      cursor: 'pointer',
      marginBottom: 20,
      padding: 15,
      '&:hover': {
        boxShadow: BOX_SHADOWS_SYSTEM.Small,
      }
    },
    placeholder: {
      fontFamily: theme.typography.fontFamily,
      textAlign: 'center',
    },
    placeholderText: {
      fontSize: FONT_SIZES_SYSTEM.StandardTitle,
    },
    thumbsupIcon: {
      color: GREY_COLORS.Color500,
      fontSize: FONT_SIZES_SYSTEM.SuperHugeTitle,
    },
    unreadNotifi: {
      paddingLeft: 1,
    }
  })
);
