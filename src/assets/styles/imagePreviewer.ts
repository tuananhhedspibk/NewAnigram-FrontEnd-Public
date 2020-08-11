import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  FONT_SIZES_SYSTEM,
  GREY_COLORS,
} from './systemDesignFactors';

export const imagePreviewerStyle = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      display: 'inline-block',
      height: 130,
      marginRight: 10,
      position: 'relative',
      width: 130,
    },
    previewer: {
      borderRadius: 10,
      height: 130,
      width: 130,
    },
    closeIcon: {
      backgroundColor: GREY_COLORS.Color800,
      border: 'solid 1px white',
      borderRadius: '50%',
      color: BASIS_COLORS.White,
      cursor: 'pointer',
      fontSize: FONT_SIZES_SYSTEM.Small,
      opacity: .5,
      padding: 3,
      position: 'absolute',
      right: 5,
      top: 5,
    },
  })
);
