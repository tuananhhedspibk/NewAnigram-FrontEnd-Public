import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  BOX_SHADOWS_SYSTEM,
  GREY_COLORS,
  PRIMARY_COLORS,
  FONT_SIZES_SYSTEM,
} from './systemDesignFactors';

export const postStyle = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      height: 60,
      width: 60,
    },
    avatarInsetBoxShadow: {
      borderRadius: '50%',
      boxShadow: BOX_SHADOWS_SYSTEM.Inner,
      height: 60,
      left: 16,
      position: 'absolute',
      top: 16,
      width: 60,
    },
    card: {
      borderRadius: 12,
      fontFamily: theme.typography.fontFamily,
      marginBottom: 25,
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingBottom: 10,
      position: 'relative',
      width: '100%',
    },
    cardActions: {
      paddingBottom: 0,
      paddingTop: 5,
    },
    cardContent: {
      paddingBottom: 0,
      paddingTop: 0,
    },
    cardHeaderTitle: {
      fontWeight: 'bold',
    },
    collapseLink: {
      border: 'none',
      color: GREY_COLORS.Color500,
      cursor: 'pointer',
      fontSize: FONT_SIZES_SYSTEM.Small,
      marginLeft: 3,
      padding: 0,
      textDecoration: 'none',
      '&:focus': {
        outline: 'none',
      }
    },
    coverLayerText: {
      color: BASIS_COLORS.White,
      fontSize: FONT_SIZES_SYSTEM.SmallTitle,
      textAlign: 'center',
      width: '100%',
    },
    floatRightButton: {
      marginLeft: 'auto',
    },
    iconButton: {
      fontSize: FONT_SIZES_SYSTEM.Normal,
      padding: 8,
    },
    iconFullBackground: {
      color: BASIS_COLORS.Red,
    },
    images: {

    },
    imageCoverLayer: {
      alignItems: 'center',
      backgroundColor: BASIS_COLORS.TransparentBackground,
      cursor: 'pointer',
      display: 'flex',
      height: '100%',
      top: 0,
      position: 'absolute',
      width: '100%',
    },
    inputWrapper: {
      boxShadow: BOX_SHADOWS_SYSTEM.Tiny,
      marginLeft: 8,
      width: '100%',
    },
    inputBase: {
      fontSize: FONT_SIZES_SYSTEM.Small,
      padding: '10px 12px',
      width: '100%',
    },
    likesInfor: {
      marginBottom: 5,
    },
    listTile: {
      position: 'relative',
    },
    media: {
      cursor: 'pointer',
      height: 0,
      paddingTop: '80%',
    },
    modal: {
      fontFamily: theme.typography.fontFamily,
    },
    postContent: {
      marginTop: 10,
      wordWrap: 'break-word',
    },
    postComments: {
      
    },
    sendMessButton: {
      color: PRIMARY_COLORS.Color500,
    },
    settingButton: {
      marginTop: 8,
    },
    tag: {
      marginRight: 5,
    },
    tagsList: {
      marginBottom: 5,
    },
    userNameLink: {
      color: BASIS_COLORS.Black,
      textDecoration: 'none',
      '&:visited': {
        color: BASIS_COLORS.Black,
      }
    }
  })
);
