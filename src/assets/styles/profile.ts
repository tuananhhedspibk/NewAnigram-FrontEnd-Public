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
} from './systemDesignFactors';

export const profileStyle = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      display: 'inline-block',
      height: 120,
      width: 120,
    },
    avatarBlock: {
      display: 'inline-block',
      margin: 'auto',
      position: 'relative',
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
    basicInfoBlock: {
      boxShadow: 'none',
      border: `solid 1px ${GREY_COLORS.Color100}`,
      height: 65,
      margin: '0 auto 15px auto',
      maxWidth: 905,
    },
    buttonIcons: {
      height: 24,
    },
    bodyWrapper: {
      backgroundColor: GREY_COLORS.Color000,
    },
    containedButton: {
      color: BASIS_COLORS.White,
    },
    endingSpace: {
      margin: 0,
      paddingTop: 65,
    },
    hiddenGrid: {
      display: 'none',
    },
    info: {
      display: 'inline-block',
      fontFamily: theme.typography.fontFamily,
      height: 65,
      paddingTop: 11,
      textAlign: 'center',
      width: 'calc(100% / 3)',
    },
    infoContent: {
      cursor: 'pointer',
    },
    imgCarouselIcon: {
      color: GREY_COLORS.Color100,
      position: 'absolute',
      right: 8,
      top: 8,
    },
    imageSuffixSpace: {
      width: 280,
    },
    infoTitle: {
      color: GREY_COLORS.Color600,
      marginBottom: 0,
      marginTop: 0,
    },
    infoValue: {
      fontWeight: 'bold',
      marginBottom: 0,
      marginTop: 0,
    },
    lineAbove: {
      display: 'inline-block',
      width: '100%',
    },
    loadMoreButton: {
      color: BASIS_COLORS.White,
      borderRadius: 20,
      fontSize: FONT_SIZES_SYSTEM.Normal,
      margin: '15px auto 25px auto',
      textTransform: 'none',
      width: 200,
    },
    loadMoreButtonWrapper: {
      textAlign: 'center',
    },
    mainBody: {
      backgroundColor: GREY_COLORS.Color000,
      marginTop: 10,
      minHeight: 'calc(100vh - 64px)',
    },
    nickName: {
      color: GREY_COLORS.Color500,
      float: 'left',
      fontSize: FONT_SIZES_SYSTEM.Normal,
      marginBottom: 0,
      marginTop: 0,
      overflowWrap: 'break-word',
      width: '100%',
    },
    profilePostRatioOneWrapper: {
      padding: 16,
      paddingBottom: 0,
    },
    profilePostRatioTwoWrapper: {
      padding: 16,
    },
    ratioOneImage: {
      display: 'block',
      height: 280,
      objectFit: 'cover',
      transition: 'transform .5s ease',
      width: 280,
    },
    ratioTwoImage: {
      display: 'block',
      height: 576,
      objectFit: 'cover',
      transition: 'transform .5s ease',
      width: 576,
      [theme.breakpoints.only('xs')]: {
        height: 280,
        width: 280,
      },
    },
    suffixSpaceWrapper: {
      [theme.breakpoints.only('xs')]: {
        display: 'none',
      },
    },
    textBlock: {
      display: 'inline-block',
      maxWidth: 230,
    },
    upperBlock: {
      fontFamily: theme.typography.fontFamily,
      paddingBottom: 20,
      paddingTop: 50,
    },
    upperRightButton: {
      borderRadius: 20,
      fontSize: FONT_SIZES_SYSTEM.Normal,
      marginLeft: 20,
      textTransform: 'none',
    },
    upperLeft: {
      textAlign: 'center',
    },
    upperRight: {
      display: 'flex',
      alignItems: 'center',
    },
    userName: {
      display: 'inline-block',
      float: 'left',
      fontSize: FONT_SIZES_SYSTEM.SmallTitle,
      marginBottom: 0,
      marginTop: 0,
      overflowWrap: 'break-word',
      width: '100%',
    },
  })
);
