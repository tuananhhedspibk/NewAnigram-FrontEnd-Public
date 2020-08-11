import { createMuiTheme } from '@material-ui/core/styles';
import {
  BASIS_COLORS,
  PRIMARY_COLORS,
  SECONDARY_COLORS,
  FONT_FAMILIES,
} from './systemDesignFactors';

export const MAIN_THEME = createMuiTheme({
  palette: {
    primary: {
      main: PRIMARY_COLORS.Color500,
    },
    secondary: {
      main: SECONDARY_COLORS.Color500,
    },
    error: {
      main: BASIS_COLORS.Red,  
      contrastText: BASIS_COLORS.White,    
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: FONT_FAMILIES.Base,
  }
});
