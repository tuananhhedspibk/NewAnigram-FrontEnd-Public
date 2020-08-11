import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  PRIMARY_COLORS,
} from './systemDesignFactors';

export const imageCropperStyle = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      width: 552,
    },
    actions: {
      paddingBottom: 15,
      paddingRight: 15,
    },
    button: {
      borderRadius: 20,
      color: BASIS_COLORS.White,
      textTransform: 'none',
    },
    cancelButton: {
      color: PRIMARY_COLORS.Color500,
    },
    cropper: {
      width: 250,
    },
    icon: {
      color: `${PRIMARY_COLORS.Color500} !important`,
      height: '30px !important',
      width: '30px !important',
    },
    middleIcon: {
      display: 'inline-block',
    },
    previewImgWrapper: {
      display: 'inline-block',
      textAlign: 'left',
      width: 250,
    },
    title: {
      fontWeight: 'bold',
      padding: '24px 24px 10px 24px',
    },
  })
);
