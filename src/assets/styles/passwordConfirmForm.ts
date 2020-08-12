import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  FONT_SIZES_SYSTEM,
} from './systemDesignFactors';

export const passwordConfirmFormStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontFamily: theme.typography.fontFamily,
    },
    button: {
      fontSize: FONT_SIZES_SYSTEM.Normal,
      textTransform: 'none',
    },
    formActions: {
      paddingTop: 0,
    },
    formTitle: {
      paddingBottom: 5,
    },
    label: {
      fontWeight: 'bold',
      marginBottom: 5,
      marginTop: 0,
    },
  })
);
