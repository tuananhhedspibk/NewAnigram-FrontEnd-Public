import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  FONT_SIZES_SYSTEM,
} from './systemDesignFactors';

export const followInfoDialogStyle = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      height: 50,
      width: 50,
    },
    dialogButton: {
      borderRadius: 20,
      fontSize: FONT_SIZES_SYSTEM.Small,
      textTransform: 'none',
    },
    dialogTitle: {
      fontSize: FONT_SIZES_SYSTEM.Small,
      padding: '18px 24px 0 24px',
    },
    followButton: {
      color: BASIS_COLORS.White,
    },
    placeholderMessage: {
      fontFamily: theme.typography.fontFamily,
      padding: '5px 16px',
    },
    usersList: {
      height: 200,
      maxHeight: 'max-content',
      padding: '0 8px 16px 8px',
      width: 300,
    },
    userNameLink: {
      color: BASIS_COLORS.Black,
      fontWeight: 'bold',
      marginLeft: 10,
      textDecoration: 'none',
      '&:visited': {
        color: BASIS_COLORS.Black,
      }
    }
  })
);
