import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';

import {
  BASIS_COLORS,
  BOX_SHADOWS_SYSTEM,
  FONT_SIZES_SYSTEM,
  GREY_COLORS,
  PRIMARY_COLORS,
} from './systemDesignFactors';

export const settingsStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderTop: `solid 1px ${GREY_COLORS.Color300}`,
      fontFamily: theme.typography.fontFamily,
      marginBottom: 32,
    },
    avatar: {
      height: 120,
      width: 120,
    },
    avatarInsetBoxShadow: {
      borderRadius: '50%',
      boxShadow: BOX_SHADOWS_SYSTEM.Inner,
      height: 120,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 120,
    },
    badge: {
      marginTop: 5,
      position: 'relative',
    },
    bodyWrapper: {
      backgroundColor: GREY_COLORS.Color000,
    },
    correct: {
      color: PRIMARY_COLORS.Color500,
    },
    inputField: {
      backgroundColor: BASIS_COLORS.White,
      marginBottom: 10,
      width: '100%',
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    mainBody: {
      backgroundColor: GREY_COLORS.Color000,
      marginTop: 10,
    },
    nameSettingBlock: {
      display: 'inline-block',
      width: '48%',
      '&:last-child': {
        float: 'right',
      }
    },
    pageTitle: {
      fontFamily: theme.typography.fontFamily,
      fontSize: FONT_SIZES_SYSTEM.StandardTitle,
      marginBottom: 48,
    },
    sideDescript: {
      color: GREY_COLORS.Color600,
      marginTop: 0,
    },
    sideTitle: {
      marginBottom: 5,
    },
    textFieldLabel: {
      display: 'inline-block',
    },
    updateButton: {
      borderRadius: 20,
      color: BASIS_COLORS.White,
      fontSize: FONT_SIZES_SYSTEM.Normal,
      marginBottom: 32,
      textTransform: 'none',
      width: 180,
    },
    updateButtonWrapper: {
      textAlign: 'center',
    },
    validateLabel: {
      display: 'inline-block',
      marginLeft: 10,
    },
    wrong: {
      color: BASIS_COLORS.Red,
    }
  })
);
