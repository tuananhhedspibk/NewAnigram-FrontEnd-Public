import {
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

import {
  BASIS_COLORS,
  FONT_SIZES_SYSTEM,
  GREY_COLORS,
  PRIMARY_COLORS,
} from './systemDesignFactors';

export const notificationSnackBarStyles = makeStyles((theme: Theme) => ({
  card: {
    borderLeft: `solid 5px ${PRIMARY_COLORS.Color500}`,
    borderRadius: 5,
    fontFamily: theme.typography.fontFamily,
    marginBottom: 15,
    marginRight: 10,
    maxWidth: 410,
    minWidth: 350,
    position: 'relative',
  },
  contentWrapper: {
    padding: 20,
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
  },
  link: {
    backgroundColor: BASIS_COLORS.White,
    border: 'none',
    color: PRIMARY_COLORS.Color500,
    cursor: 'pointer',
    fontSize: FONT_SIZES_SYSTEM.Normal,
    textDecoration: 'none',
    '&:focus': {
      outline: 'none',
    }
  },
  message: {
    color: GREY_COLORS.Color500,
    display: 'inline-block',
    margin: 0,
  },
  title: {
    fontWeight: 'bold',
    margin: '0 0 8px 0',
  },
}));
