import {
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  GREY_COLORS,
  FONT_SIZES_SYSTEM,
} from './systemDesignFactors';

export const createPostDialogStyle = makeStyles((_theme: Theme) =>
  createStyles({
    chip: {
      marginBottom: 5,
      marginRight: 5,
    },
    chipDeleteIcon: {
      color: BASIS_COLORS.White,
    },
    contentField: {
      marginBottom: 25,
      minWidth: 450,
    },
    dialogButton: {
      textTransform: 'none',
    },
    dialogTitle: {
      fontWeight: 'bold',
      padding: '24px 24px 10px 24px',
    },
    previewImages: {
      overflowX: 'scroll',
      whiteSpace: 'nowrap',
      width: 'calc(60% - 10px)',
    },
    previewImage: {
      borderRadius: 10,
      height: 125,
      marginRight: 5,
      width: 125,
    },
    tagsInputPlace: {
      border: `solid 1px ${GREY_COLORS.Color200}`,
      borderRadius: 10,
      boxShadow:
        'inset 0 2px 2px hsla(0, 0%, 0%, 0.1), 0 2px 0 hsla(0, 0%, 100%, .15)',
      cursor: 'text',
      marginBottom: 25,
      padding: 10,
    },
    tagInputField: {
      border: 'none',
      fontSize: FONT_SIZES_SYSTEM.Small,
      '&:focus': {
        outline: 'none',
      },
    },
  })
);
