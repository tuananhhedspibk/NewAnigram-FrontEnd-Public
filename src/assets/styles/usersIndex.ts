import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  BOX_SHADOWS_SYSTEM,
  FONT_FAMILIES,
  FONT_SIZES_SYSTEM,
  GREY_COLORS,
  PRIMARY_COLORS,
} from './systemDesignFactors';

export const usersIndexStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: GREY_COLORS.Color100,
      fontFamily: FONT_FAMILIES.Base,
      overflowY: 'scroll',
      paddingBottom: 45,
      minHeight: '100vh',
    },
    header: {
      alignItems: 'center',
      display: 'flex',
      margin: '60px auto 35px auto',
      width: 'calc(80% - 80px)',
    },
    hiddenRow: {
      display: 'none',
    },
    itemRoot: {
      backgroundColor: BASIS_COLORS.White,
      borderRadius: 10,
      display: 'inline-block',
      margin: '0 10px',
      textAlign: 'left',
      width: 300,
      '&:hover': {
        boxShadow: BOX_SHADOWS_SYSTEM.Normal,
        transition: 'box-shadow .5s',
      }
    },
    itemLeftBlock: {
      display: 'inline-block',
      float: 'left',
      padding: 20,
      width: 80,
    },
    itemRightBlock: {
      display: 'inline-block',
      float: 'left',
      padding: '20px 20px 20px 0',
      width: 160,
    },
    itemAvatar: {
      borderRadius: 50,
      height: 80,
      width: 80,
    },
    itemUserName: {
      cursor: 'pointer',
      fontWeight: 'bold',
      marginBottom: 8,
    },
    itemUserData: {
      color: GREY_COLORS.Color600,
      marginBottom: 5,
    },
    itemTextLabel: {
      display: 'inline-block',
      marginRight: 5,
    },
    itemTextData: {
      display: 'inline-block',
      margin: 0,
    },
    itemUserNameText: {
      margin: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    itemsList: {
      margin: '25px auto',
      textAlign: 'center',
      width: '80%',
    },
    itemsRow: {
      display: 'flex',
      justifyContent: 'center',
      margin: 20, 
    },
    loadMoreButton: {
      color: BASIS_COLORS.White,
      borderRadius: 20,
      fontSize: FONT_SIZES_SYSTEM.Normal,
      margin: '5px auto 35px auto',
      textTransform: 'none',
      width: 200,
    },
    loadMoreButtonWrapper: {
      textAlign: 'center',
    },
    pageTitle: {
      display: 'inline-block',
      fontSize: FONT_SIZES_SYSTEM.StandardTitle,
      fontWeight: 'bold',
      margin: 0,
      width: '50%',
    },
    notFoundWrapper: {
      textAlign: 'center',
    },
    notfoundImg: {
      width: 300,
    },
    notfoundText: {
      color: PRIMARY_COLORS.Color500,
      fontSize: FONT_SIZES_SYSTEM.SmallTitle,
      fontWeight: 'bold',
    },
    searchBoxWrapper: {
      borderRadius: 10,
      display: 'inline-block',
      width: '50%',
    },
    filterSuggestFriends: {
      width: '100%',
    },
    userNameSearchInput: {
      width: 'calc(100% - 50px)',
    },
    textField: {
      backgroundColor: BASIS_COLORS.White,
      borderRadius: 10,
      padding: '10px 15px',
      '&:focus': {
        boxShadow: BOX_SHADOWS_SYSTEM.Medium
      }
    },
    iconButton: {
      padding: 10,
    },
  })
);
