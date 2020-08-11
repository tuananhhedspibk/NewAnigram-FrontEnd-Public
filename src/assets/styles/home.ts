import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  FONT_SIZES_SYSTEM,
  GREY_COLORS,
} from './systemDesignFactors';

export const homeStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: GREY_COLORS.Color100,
    },
    circularWrapper: {
      textAlign: 'center',
    },
    mainContent: {
      marginTop: 30,
      minHeight: 'calc(100vh - 64px)',
    },
    leftBlock: {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    fabButtonCenter: {
      [theme.breakpoints.only('xs')]: {
        display: 'block',
      },
    },
    fabButtonRight: {
      [theme.breakpoints.only('sm')]: {
        display: 'block',
      },
    },
    centerBlock: {
    },
    emptyCenter: {
      textAlign: 'center',
    },
    postButton: {
      borderRadius: 20,
      color: BASIS_COLORS.White,
      fontSize: FONT_SIZES_SYSTEM.Normal,
      marginTop: 15,
      textTransform: 'none',
      width: '100%',
    },
    postButtonOfEmptyCenter: {
      borderRadius: 20,
      color: BASIS_COLORS.White,
      fontSize: FONT_SIZES_SYSTEM.Normal,
      marginTop: 15,
      textTransform: 'none',
      width: '50%',
    },
    rightBlock: {
      [theme.breakpoints.only('xs')]: {
        display: 'none',
      },
    },
    title: {
      color: GREY_COLORS.Color600,
      fontFamily: theme.typography.fontFamily,
      fontSize: FONT_SIZES_SYSTEM.StandardTitle,
      marginBottom: 0,
      marginTop: 0,
    } 
  })
);
