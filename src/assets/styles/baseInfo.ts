import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  BOX_SHADOWS_SYSTEM,
  PRIMARY_COLORS,
  FONT_SIZES_SYSTEM,
  GREY_COLORS,
} from './systemDesignFactors';

export const baseInfoStyle = makeStyles((theme: Theme) =>
  createStyles({
    avatarBlock: {
      display: 'inline-block',
      position: 'relative',
    },
    avatar: {
      height: 70,
      width: 70,
    },
    avatarGroup: {
      paddingLeft: 13,
      paddingTop: 2,
    },
    basicInfoBlock: {
      float: 'right',
      padding: 0,
      width: 'calc(100% - 75px)',
    },
    boxShadowForAvatar: {
      borderRadius: '50%',
      boxShadow: BOX_SHADOWS_SYSTEM.Inner,
      height: 70,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 70,
    },
    card: {
      boxShadow: BOX_SHADOWS_SYSTEM.Small,
      fontFamily: theme.typography.fontFamily,
      fontSize: FONT_SIZES_SYSTEM.Small,
      position: 'relative',
      width: '100%',
    },
    cardHeader: {
      borderBottom: `solid 1px ${GREY_COLORS.Color200}`,
      display: 'inline-block',
      padding: '17px 15px',
      width: '100%',
    },
    divider: {
      borderBottom: `solid 1px ${GREY_COLORS.Color200}`,
      margin: 'auto',
      width: 215
    },
    editButton: {
      color: PRIMARY_COLORS.Color500,
    },
    followPart: {
      padding: '12px 10px',
    },
    followInforTitle: {
      marginBottom: 8,
      marginLeft: 5,
      marginTop: 0,
    },
    followTitleNumber: {
      display: 'inline-block',
      fontWeight: 'bold',
      marginBottom: 0,
      marginTop: 0,
    },
    followTitleText: {
      color: GREY_COLORS.Color600,
      display: 'inline-block',
      marginLeft: 4,
      marginBottom: 0,
      marginTop: 0,
    },
    listItem: {
      paddingLeft: 8,
    },
    listItemText: {
      maxWidth: 180,
      overflow: 'hidden !important',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    listItemSecondaryAct: {
      right: 12,
    },
    nickName: {
      color: GREY_COLORS.Color600,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    smallAvatar: {
      cursor: 'pointer',
      fontSize: FONT_SIZES_SYSTEM.Small,
    },
    userName: {
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  })
);
