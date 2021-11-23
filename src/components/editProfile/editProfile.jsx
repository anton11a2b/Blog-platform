import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';

import scheme from './validation';
import { editProfile } from '../../redux/actions/actionCreators';

import classes from './editProfile.module.scss';

const EditProfile = () => {
	const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: 'onChange', resolver: yupResolver(scheme) });
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
          <span className={classes.inputName}>Username</span>
          <input
            type="text"
            name="username"
            defaultValue={user.username}
            placeholder="username"
            {...register('username')}
            className={errors.username ? classes.inputFieldError : classes.inputField}
          />
          <p className={classes.error}>{errors?.username?.message}</p>
        </div>
        <div className={classes.inputWrapper}>
          <span className={classes.inputName}>Email address</span>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            {...register('email')}
            placeholder="Email address"
            className={errors.email ? classes.inputFieldError : classes.inputField}
          />
          <p className={classes.error}>{errors?.email?.message}</p>
        </div>
        <div className={classes.inputWrapper}>
          <span className={classes.inputName}>New password</span>
          <input
            type="password"
            name="password"
            {...register('password')}
            placeholder="New password"
            className={errors.password ? classes.inputFieldError : classes.inputField}
          />
          <p className={classes.error}>{errors?.password?.message}</p>
        </div>
        <div className={classes.inputWrapper}>
          <span className={classes.inputName}>Avatar image (URL)</span>
          <input
            type="text"
            name="image"
            defaultValue={user.image}
            {...register('image')}
            placeholder="Avatar image"
            className={errors.image ? classes.inputFieldError : classes.inputField}
          />
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
