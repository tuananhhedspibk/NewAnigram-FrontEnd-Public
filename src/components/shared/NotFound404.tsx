import React from 'react';

import { ROUTES } from '../utils/constants';

import { MAIN_THEME } from '../../assets/styles/themes';
import { notfound404Style } from '../../assets/styles/notfound404';

export const NotFound404 = () => {
  const classes = notfound404Style(MAIN_THEME);

  return (
    <div className={classes.root}>
      <div className={classes.body}>
        <div className={classes.title}>
          <h1 className={classes.h1}>
            4<span className={classes.span}>0</span>4
          </h1>
        </div>
        <h2 className={classes.h2}>
          The Page You Requested Could Not Found
        </h2>
        <h2 className={classes.h2}>
          Time to
          <a className={classes.link} href={ROUTES.Home}>
            Home
          </a>
        </h2>
      </div>
	  </div>
  )
}
