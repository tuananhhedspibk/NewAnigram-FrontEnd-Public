import {
  FONT_FAMILIES,
} from './systemDesignFactors';

export const fullScreenCarouselStyles = {
  footer: (base: any, _state: any) => {
    const fontFamily = FONT_FAMILIES;

    return { ...base, fontFamily };
  }
}
