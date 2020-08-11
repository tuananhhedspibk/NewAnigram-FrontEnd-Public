import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  BASIS_COLORS, FONT_SIZES_SYSTEM, GREY_COLORS,
} from './systemDesignFactors';

export const fabButtonStyle = makeStyles((theme: Theme) =>
  createStyles({
    addPostButtonRoot: {
      bottom: 20,
      color: BASIS_COLORS.White,
      display: 'none',
      lineHeight: 1,
      position: 'fixed',
      right: 20,
    },
    addPostButtonForXsScreen: {
      [theme.breakpoints.only('xs')]: {
        display: 'block',
      },
    },
    addPostButtonForSmScreen: {
      [theme.breakpoints.only('sm')]: {
        display: 'block',
      },
    },
    newPostButtonRoot: {
      backgroundColor: GREY_COLORS.Color300,
      color: BASIS_COLORS.Black,
      display: 'block',
      fontSize: FONT_SIZES_SYSTEM.Normal,
      height: 38,
      left: 'calc(50% - 38px)',
      position: 'fixed',
      textTransform: 'none',
      width: 110,
    },
    hideNewPostButton: {
      display: 'none',
    },
    newPostButtonInitPosition: {
      top: 90,
    },
    newPostButtonScrollingPosition: {
      top: 20,
    },
  })
);
