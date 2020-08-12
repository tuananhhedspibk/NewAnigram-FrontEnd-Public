import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useMutation } from '@apollo/react-hooks';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

import IconButton from '@material-ui/core/IconButton';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

import { MuiThemeProvider } from '@material-ui/core/styles';

import fetchUser from '../../lib/queries/fetchUserFullData';
import updateUser from '../../lib/mutations/updateUser';
import genS3PutURL from '../../lib/mutations/genS3PutURL';
import genS3GetURL from '../../lib/mutations/genS3GetURL';

import { ApplicationBar } from '../shared/ApplicationBar';
import { AlertSnackBar } from '../shared/AlertSnackBar';
import { PasswordConfirmForm } from './PasswordConfirmForm';

import { settingsStyle } from '../../assets/styles/settings';
import { MAIN_THEME } from '../../assets/styles/themes';

import { authStateSelector } from '../../redux/selectors';

import {
  DEFAULT_IMAGES,
  ERROR_MESSAGES,
  LOG_TYPES,
  ROUTES,
  SNACKBAR_TYPES,
  SUCCESS_MESSAGES,
  WARNING_MESSAGES,
  PopupStatus,
} from '../utils/constants';
import {
  isEmailValidate,
  getLocalStorageUserId,
  logger,
  pushImageToS3,
  hashString,
  handleSnackBar,
  userDataHasChanged,
  syncLocalStorageUserData,
} from '../utils/helpers';

interface UserSettingsProps {
  history: any,
};

export const UserSettings = (props: UserSettingsProps) => {
  const classes = settingsStyle(MAIN_THEME);
  const { history } = props;

  const [ prvImgSrc, setPrvImgSrc ] = useState('');
  const [ rawImg, setRawImg ] = useState('' as any);
  const [ imageS3PutURL, setImageS3PutURL ] = useState('');
  const [ imageS3GetURL, setImageS3GetURL ] = useState('');

  const [ newPass, setNewPass ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ userName, setUserName ] = useState('');
  const [ nickName, setNickName ] = useState('');
  const [ emailValidate, setEmailValidate ] = useState(true);
  const [ confirmNewPass, setConfirmNewPass ] = useState('');

  const [ userData, setUserData ] = useState('' as any);

  const [ confirmPassDialogOpen, setConfirmPassDialogOpen ] = useState(false);
  const [ confirmPassMatch, setConfirmPassMatch ] = useState(false);

  const [ snackBarOpen, setSnackBarOpen ] = useState(false);
  const [ snackBarMessage, setSnackBarMessage ] = useState('');
  const [ snackBarType, setSnackBarType ] = useState('');

  const [ skipFetchUser, setSkipFetchUser ] = useState(false);

  const authState = useSelector(authStateSelector);
  const [ updateUserMutation ] = useMutation(updateUser);
  const [ genS3PutURLMutation ] = useMutation(genS3PutURL);
  const [ genS3GetURLMutation ] = useMutation(genS3GetURL);

  const userId = getLocalStorageUserId();

  const fetchUserResult = useQuery(fetchUser, {
    variables: {
      id: userId,
    },
    skip: skipFetchUser || userId === '',
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (!authState.isAuthenticated) {
      history.push(ROUTES.SignIn);
    }

    if (fetchUserResult.data) {
      const fetchedUserData = fetchUserResult.data.user;

      const userBaseData = {
        avatarURL: fetchedUserData.avatarURL,
        email: fetchedUserData.email,
        id: userId,
        userName: fetchedUserData.userName,
        nickName: fetchedUserData.nickName,
      };

      if (userDataHasChanged(userBaseData)) {
        syncLocalStorageUserData(userBaseData);
      }

      setSkipFetchUser(true);
      setUserData(fetchedUserData);
      setEmail(fetchedUserData.email);
      setUserName(fetchedUserData.userName);
      setNickName(fetchedUserData.nickName);
      setPrvImgSrc(fetchedUserData.avatarURL);
    }

    if (confirmPassMatch) {
      handleUpdateUser();
    }
  }, [
    authState.isAuthenticated,
    fetchUserResult,
    confirmPassMatch,
  ]);

  const handleUploadImage = async (evt: any) => {
    const image = evt.target.files[0];
    const hashedImageName =
      `${hashString(image.name)}.${image.type.split('/')[1]}`;
    const tasks = [
      genS3PutURLMutation({
        variables: {
          key: `users/${userId}/settings/avatars/${hashedImageName}`,
          contentType: image.type,
        }
      }),
      genS3GetURLMutation({
        variables: {
          key: `users/${userId}/settings/avatars/${hashedImageName}`,
        }
      })
    ];
    await Promise.all(tasks)
      .then(results => {
        const resForPutURL = results[0];
        const resForGetURL = results[1];

        if (resForPutURL.data.s3PutURL.result) {
          const imageS3URL = resForPutURL.data.s3PutURL.url;
          setImageS3PutURL(imageS3URL);
        }

        if (resForGetURL.data.s3GetURL.result) {
          const imageS3URL = resForGetURL.data.s3GetURL.url;
          setImageS3GetURL(imageS3URL);
        }
      })
      .catch(err =>
        logger(
          LOG_TYPES.Error,
          'handleUploadImage-UserSettings',
          err
        )
      );
    setPrvImgSrc(
      URL.createObjectURL(image)
    );
    setRawImg(image);
  }

  const handleEmailInputChange = (currentEmail: string) => {
    setEmail(currentEmail);
    if (currentEmail !== '') {
      setEmailValidate(isEmailValidate(currentEmail));
    } else {
      setEmailValidate(true);
    }
  }

  const handleUpdateButtonClick = () => {
    if (userData !== '') {
      if (
        userData.email === email
        && userData.userName === userName
        && userData.nickName === nickName
        && userData.avatarURL === prvImgSrc
        && newPass === ''
      ) {
        handleSnackBar(
          PopupStatus.Open,
          SNACKBAR_TYPES.Warning,
          WARNING_MESSAGES.User.Edit,
          setSnackBarOpen,
          setSnackBarType,
          setSnackBarMessage,
        );
      } else if (!emailValidate || confirmNewPass !== newPass) {
        handleSnackBar(
          PopupStatus.Open,
          SNACKBAR_TYPES.Error,
          ERROR_MESSAGES.User.Edit.DataNotValidate,
          setSnackBarOpen,
          setSnackBarType,
          setSnackBarMessage,
        );
      }
      else {
        setConfirmPassDialogOpen(true);
      }
    }
  }

  const handleUpdateUser = async () => {
    const updateUserData = {
      id: userId,
      email: userData.email === email ? '' : email,
      userName: userData.userName === userName ? '' : userName,
      nickName: userData.nickName === nickName ? '' : nickName,
      avatarURL: userData.avatarURL === prvImgSrc ? '' : imageS3GetURL,
      password: userData.password === newPass ? '' : newPass,
    };
    setConfirmPassMatch(false);

    try {
      if (imageS3PutURL !== '') {
        await pushImageToS3(imageS3PutURL, rawImg, {
          params: {
            Key: rawImg.name,
            ContentType: rawImg.type,
          },
          headers: {
            'Content-Type': rawImg.type,
          }
        });
      }
    
      const response = await updateUserMutation({
        variables: updateUserData,
      });

      if(response.data.updateUser.result) {
        handleSnackBar(
          PopupStatus.Open,
          SNACKBAR_TYPES.Success,
          SUCCESS_MESSAGES.User.Edit,
          setSnackBarOpen,
          setSnackBarType,
          setSnackBarMessage,
        );
        setSkipFetchUser(false);
      } else {
        handleSnackBar(
          PopupStatus.Open,
          SNACKBAR_TYPES.Error,
          ERROR_MESSAGES.User.Edit.Result,
          setSnackBarOpen,
          setSnackBarType,
          setSnackBarMessage,
        );
      }
    } catch (err) {
      logger(
        LOG_TYPES.Error,
        'handleUpdateUser-UserSettings',
        err,
      );
    }
  }

  const snackBarHandler = (
    status: number,
    type: string,
    message: string,
  ) => {
    handleSnackBar(
      status,
      type,
      message,
      setSnackBarOpen,
      setSnackBarType,
      setSnackBarMessage
    );
  }

  return (
    <MuiThemeProvider theme={MAIN_THEME}>
      <div className={classes.bodyWrapper}>
        <ApplicationBar history={history} />
        <AlertSnackBar
          message={snackBarMessage}
          type={snackBarType}
          open={snackBarOpen}
          handleClose={() => setSnackBarOpen(false)}
        />
        <PasswordConfirmForm
          closeFormHandler={() => setConfirmPassDialogOpen(false)}
          setConfirmPassMatch={setConfirmPassMatch}
          snackBarHandler={snackBarHandler}
          open={confirmPassDialogOpen}
        />
        <div className={classes.mainBody}>
        <Grid
          container
          justify='center'
        >
          <Grid item md={8}>
            <p className={classes.pageTitle}>Account Settings</p>
          </Grid>
        </Grid>
        <Grid
          container
          justify='center'
        >
          <Grid item md={8}>
            <Grid
              container spacing={4}
              justify='center'
              className={classes.root}
            >
              <Grid item md={4}>
                <p className={classes.sideTitle}>
                  Basics
                </p>
                <p className={classes.sideDescript}>
                  Having an up-to-date email is a greate method
                  to protect yourself
                </p>
              </Grid>
              <Grid item md={8}>
                <p className={`${classes.label} ${classes.textFieldLabel}`}>
                  Email
                </p>
                {
                  emailValidate
                  ? <p className={`${classes.validateLabel} ${classes.correct}`}>
                      &#10004;
                    </p>
                  : <p className={`${classes.validateLabel} ${classes.wrong}`}>
                      &#10008;
                    </p>
                }
                <TextField
                  className={classes.inputField}
                  error={!emailValidate}
                  onChange={evt => handleEmailInputChange(evt.target.value)}
                  placeholder='randomuser@gmail.com'
                  value={email}
                  variant='outlined'
                />
                <p className={`${classes.label} ${classes.textFieldLabel}`}>
                  Password
                </p>
                {
                  newPass !== ''
                  ? (
                      newPass === confirmNewPass
                      ? <p className={`${classes.validateLabel} ${classes.correct}`}>
                          &#10004;
                        </p>
                      : <p className={`${classes.validateLabel} ${classes.wrong}`}>
                          &#10008;
                        </p>
                    )
                  : <></>
                }
                <TextField
                  className={classes.inputField}
                  onChange={
                    (evt: any) => setNewPass(evt.target.value)
                  }
                  placeholder='New password'
                  type='password'
                  value={newPass}
                  variant='outlined'
                />
                <TextField
                  error={newPass !== confirmNewPass}
                  className={classes.inputField}
                  label={
                    newPass === confirmNewPass
                      ? undefined
                      : 'Confirm Password isn\'t same with Password'
                  }
                  onChange={
                    (evt: any) => setConfirmNewPass(evt.target.value)
                  }
                  placeholder='Confirm new password'
                  type='password'
                  value={confirmNewPass}
                  variant='outlined'
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justify='center'
        >
          <Grid item md={8}>
            <Grid
              container spacing={4}
              justify='center'
              className={classes.root}
            >
              <Grid item md={4}>
                <p className={classes.sideTitle}>
                  Profile
                </p>
                <p className={classes.sideDescript}>
                  This information will be shown publicly,
                  so be careful before submitting
                </p>
              </Grid>
              <Grid item md={8}>
                <div className='name-setting'>
                  <div className={classes.nameSettingBlock}>
                    <p className={classes.label}>User Name</p>
                    <TextField
                      className={classes.inputField}
                      value={userName}
                      placeholder='User Name'
                      variant='outlined'
                      onChange={
                        (evt: any) => setUserName(evt.target.value)
                      }
                    />
                  </div>
                  <div className={classes.nameSettingBlock}>
                    <p className={classes.label}>Nick Name</p>
                    <TextField
                      className={classes.inputField}
                      value={nickName}
                      placeholder='Nick Name'
                      variant='outlined'
                      onChange={
                        (evt: any) => setNickName(evt.target.value)
                      }
                    />
                  </div>
                </div>
                <p className={classes.label}>Avatar</p>
                <Badge
                  overlap='circle'
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  className={classes.badge}
                  badgeContent={
                    <IconButton
                      component='label'
                    >
                      <input
                        type='file'
                        style={{ display: 'none' }}
                        accept='image/png,image/jpeg,image/jpg,image/svg'
                        onChange={handleUploadImage}
                      />
                      <CameraAltIcon/>
                    </IconButton>
                  }
                >
                  <Avatar
                    alt='avatar'
                    className={classes.avatar}
                    src={prvImgSrc !== '' ? prvImgSrc : DEFAULT_IMAGES.Avatar}
                  />
                  <div className={classes.avatarInsetBoxShadow} />
                </Badge>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.updateButtonWrapper}>
          <Button
            variant='contained'
            size='medium'
            color='primary'
            className={classes.updateButton}
            onClick={handleUpdateButtonClick}
          >
            Update my settings
          </Button>
        </div>
      </div>
      </div>
    </MuiThemeProvider>
  );
}
