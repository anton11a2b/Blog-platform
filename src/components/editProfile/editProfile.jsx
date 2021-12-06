import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';

import { editProfileScheme } from '../../util/util';
import { editProfile } from '../../redux/actions/actionCreators';

import classes from './editProfile.module.scss';

const EditProfile = () => {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: 'onChange', resolver: yupResolver(editProfileScheme) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authErrors, user } = useSelector((state) => state);

  const onSubmit = (data) => {
    dispatch(editProfile(data, user, () => navigate('/', { replace: true })));
  };

  useEffect(() => {
    if (authErrors) {
      Object.keys(authErrors).forEach((key) => {
        setError(key, {
          type: 'manual',
          message: `This ${key} is taken`,
        });
      });
    }
  }, [authErrors, setError]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <h2 className={classes.title}>Edit Profile</h2>
        <div className={classes.inputWrapper}>
          <label className={classes.inputName}>
            Username
            <input
              type="text"
              name="username"
              defaultValue={user.username}
              placeholder="username"
              {...register('username')}
              className={errors.username ? classes.inputFieldError : classes.inputField}
            />
          </label>
          <p className={classes.error}>{errors?.username?.message}</p>
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.inputName}>
            Email address
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              {...register('email')}
              placeholder="Email address"
              className={errors.email ? classes.inputFieldError : classes.inputField}
            />
          </label>
          <p className={classes.error}>{errors?.email?.message}</p>
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.inputName}>
            New password
            <input
              type="password"
              name="password"
              {...register('password')}
              placeholder="New password"
              className={errors.password ? classes.inputFieldError : classes.inputField}
            />
          </label>
          <p className={classes.error}>{errors?.password?.message}</p>
        </div>
        <div className={classes.inputWrapper}>
          <label className={classes.inputName}>
            Avatar image (URL)
            <input
              type="text"
              name="image"
              defaultValue={user.image}
              {...register('image')}
              placeholder="Avatar image"
              className={errors.image ? classes.inputFieldError : classes.inputField}
            />
          </label>
          <p className={classes.error}>{errors?.image?.message}</p>
        </div>
        <button className={classes.btnSave} type="submit" disabled={!isDirty || !isValid}>
          Save
        </button>
      </form>
    </>
  );
};

export default EditProfile;
