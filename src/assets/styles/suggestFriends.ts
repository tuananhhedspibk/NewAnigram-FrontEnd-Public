import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  FONT_FAMILIES,
  FONT_SIZES_SYSTEM,
  GREY_COLORS,
  PRIMARY_COLORS,
} from './systemDesignFactors';

export const suggestFriendStyle = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginBottom: 25,
      width: '100%',
    },
    divider: {
      borderBottom: `solid 1px ${GREY_COLORS.Color200}`,
      float: 'right',
      width: 'calc(100% - 72px)',
    },
    followButton: {
      color: PRIMARY_COLORS.Color500,
    },
    list: {
      paddingTop: 4,
    },
    listItemPrimaryText: {
      cursor: 'pointer',
      fontFamily: theme.typography.fontFamily,
      fontSize: FONT_SIZES_SYSTEM.Small,
      fontWeight: 'bold',
      maxWidth: 160,
      overflow: 'hidden !important',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    listItemSecondaryText: {
      color: GREY_COLORS.Color600,
      fontFamily: theme.typography.fontFamily,
    },
    secondaryTextItem: {
      display: 'block',
    },
    seeAllLink: {
      backgroundColor: BASIS_COLORS.White,
      border: 'none',
      color: PRIMARY_COLORS.Color700,
      cursor: 'pointer',
      fontFamily: FONT_FAMILIES.Base,
      fontSize: FONT_SIZES_SYSTEM.Normal,
      outline: 'none',
      textDecoration: 'underline',
    },
    title: {
      color: PRIMARY_COLORS.Color700,
      fontSize: FONT_SIZES_SYSTEM.Normal,
    },
  })
);
