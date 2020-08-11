import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  FONT_SIZES_SYSTEM,
  GREY_COLORS,
  PRIMARY_COLORS,
} from './systemDesignFactors';

export const postModalStyle = makeStyles((theme: Theme) =>
  createStyles({
    activityData: {
      display: 'inline-block',
      margin: 0,
      marginLeft: 3,
    },
    activityInfor: {
      display: 'inline-block',
      padding: '15px 15px 5px 15px',
      width: 'calc(50% - 40px)',
    },
    activitySection: {
      alignItems: 'center',
      display: 'flex',
      float: 'left',
      marginBottom: 5,
      marginRight: 20,
      maxWidth: 100,
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
    gridListContentCenter: {
      justifyContent: 'center',
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
    },
    iconGreenBackground: {
      color: PRIMARY_COLORS.Color500,
    },
    iconRedBackground: {
      color: BASIS_COLORS.Red,
    },
    image: {
      width: 500,
    },
    main: {
      fontFamily: theme.typography.fontFamily,
    },
    numeralData: {
      alignItems: 'center',
      display: 'flex',
    },
    postBody: {
      maxheight: 310,
      minHeight: 250,
      overflowY: 'scroll',
    },
    postComments: {
      padding: '0 15px 15px 15px',
    },
    postContent: {
      margin: '10px 0',
      paddingLeft: 15,
      paddingRight: 15,
    },
    postImages: {
      borderBottom: `1px solid ${GREY_COLORS.Color200}`,
      padding: 20,
    },
    tag: {
      marginRight: 5,
    },
    tagsList: {
      marginBottom: 5,
      paddingLeft: 15,
    },
    timeStamp: {
      color: GREY_COLORS.Color500,
      display: 'inline-block',
      margin: 0,
      paddingRight: 15,
      textAlign: 'right',
      width: 'calc(50% - 15px)',
    },
  })
);
