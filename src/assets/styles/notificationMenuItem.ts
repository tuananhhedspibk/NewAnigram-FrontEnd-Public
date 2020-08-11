import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  BOX_SHADOWS_SYSTEM,
  PRIMARY_COLORS,
  SECONDARY_COLORS,
} from './systemDesignFactors';

export const notitifcationMenuItemStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: 'center',
      display: 'flex',
      paddingLeft: 15,
    },
    avatar: {
      borderRadius: '50%',
      height: 60,
      width: 60,
    },
    avatarBlock: {
      position: 'relative',
    },
    avatarInsetBoxShadow: {
      borderRadius: '50%',
      boxShadow: BOX_SHADOWS_SYSTEM.Inner,
      height: 60,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 60,
    },
    content: {
      margin: 0,
    },
    icon: {},
    iconChat: {
      color: SECONDARY_COLORS.Color300,
    },
    iconFollow: {
      color: PRIMARY_COLORS.Color500,
    },
    iconThumbs: {
      color: SECONDARY_COLORS.Color500,
    },
    iconWrapper: {
      display: 'inline-block',
      margin: 0,
    },
    leftSide: {
      display: 'inline-block',
      width: 70,
    },
    unreadVerticalMark: {
      borderLeft: `solid 4px ${SECONDARY_COLORS.Color400}`,
    },
    rightSide: {
      display: 'inline-block',
      padding: '5px 10px',
      width: 'calc(100% - 60px)',
    },
    timeData: {
      display: 'inline-block',
      margin: '0 0 0 5px',
    },
    timeStamp: {
      display: 'flex',
      paddingTop: 8,
    },
  })
);
