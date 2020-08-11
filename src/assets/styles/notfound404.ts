import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  BOX_SHADOWS_SYSTEM,
  FONT_SIZES_SYSTEM,
  PRIMARY_COLORS,
} from './systemDesignFactors';

export const notfound404Style = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: BASIS_COLORS.White,
      fontFamily: theme.typography.fontFamily,
      height: '100vh',
      position: 'relative',
    },
    body: {
      background: BASIS_COLORS.White,
      borderRadius: 10,
      boxShadow: BOX_SHADOWS_SYSTEM.Small,
      left: '50%',
      lineHeight: 1.4,
      maxWidth: 600,
      msTransform: 'translate(-50%, -50%)',
      padding: '80px 40px',
      position: 'absolute',
      textAlign: 'center',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      webkitBoxShadow: BOX_SHADOWS_SYSTEM.Normal,
      webkitTransform: 'translate(-50%, -50%)',
      width: '100%',
    },
    h1: {
      fontSize: FONT_SIZES_SYSTEM.HugeTitle,
      marginBottom: 0,
    },
    h2: {
      marginTop: 11,
    },
    link: {
      color: PRIMARY_COLORS.Color500,
      marginLeft: 5,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
      '&:visited': {
        color: PRIMARY_COLORS.Color500,
      }
    },
    span: {
      color: PRIMARY_COLORS.Color500,
    },
    title: {
      position: 'relative',
    }
  })
);
