import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const postSinglePageStyle = makeStyles((_theme: Theme) =>
  createStyles({
    postWrapper: {
      margin: '50px auto 0 auto',
      width: 550,
    }
  })
);
