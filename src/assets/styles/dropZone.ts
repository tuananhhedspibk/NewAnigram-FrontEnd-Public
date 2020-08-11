import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  BOX_SHADOWS_SYSTEM,
  GREY_COLORS,
  FONT_SIZES_SYSTEM,
} from './systemDesignFactors';

export const dropZoneStyle = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      cursor: 'pointer',
      float: 'left',
      marginRight: 10,
      maxWidth: 200,
      minWidth: 150,
      width: '40%',
    },
    dropPlace: {
      backgroundColor: GREY_COLORS.Color400,
      borderRadius: 10,
      boxShadow: BOX_SHADOWS_SYSTEM.DropZoneInner,
      fontFamily: theme.typography.fontFamily,
      height: 100,
      padding: '15px 10px',
      textAlign: 'center',
    },
    dropPlaceTitle: {
      color: BASIS_COLORS.White,
      fontWeight: 'bold',
      marginTop: 0,
    },
    uploadIcon: {
      color: BASIS_COLORS.White,
      fontSize: FONT_SIZES_SYSTEM.HugeTitle,
    },
  })
);
