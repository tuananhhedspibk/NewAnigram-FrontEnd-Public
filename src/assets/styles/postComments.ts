import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  PRIMARY_COLORS,
} from './systemDesignFactors';

export const postCommentsStyle = makeStyles((_theme: Theme) =>
  createStyles({
    root: {},
    comment: {
      alignItems: 'center',
      display: 'flex',
      padding: '6px 0',
    },
    comments: {
      marginTop: 8,
    },
    commentContent: {
      display: 'inline-block',
      margin: 0,
    },
    icon: {
      color: PRIMARY_COLORS.Color500,
    },
    iconButtonWrapper: {
      textAlign: 'center',
    },
    iconButton: {
      border: `solid 1px ${PRIMARY_COLORS.Color500}`,
      margin: '0 auto',
      padding: 6,
    },
    userAvatar: {
      borderRadius: '50%',
      height: 35,
      marginRight: 10,
      width: 35,
    },
    userName: {
      color: BASIS_COLORS.Black,
      cursor: 'pointer',
      fontWeight: 'bold',
      marginRight: 6,
      textDecoration: 'none',
      '&:visited': {
        color: BASIS_COLORS.Black,
      },
    },
  })
);
