import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector, useDispatch } from 'react-redux';

import scheme from './validation';
import { registration } from '../../redux/actions/actionCreators';

import classes from './signUp.module.scss';

const SignUp = () => {
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: 'onChange', resolver: yupResolver(scheme) });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authErrors } = useSelector((state) => state);

  const onSubmit = (data) => {
    dispatch(registration(data, () => navigate('/', { replace: true })));
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
        <h2 className={classes.title}>Create new account</h2>
        <div className={classes.inputWrapper}>
          <span className={classes.inputName}>Username</span>
          <input
            type="text"
            name="username"
            placeholder="username"
            {...register('username')}
            className={errors.username ? classes.inputFieldError : classes.inputField}
          />
          {errors.username && <p className={classes.error}>{errors.username.message}</p>}
        </div>
        <div className={classes.inputWrapper}>
          <span className={classes.inputName}>Email address</span>
          <input
            type="email"
            name="email"
            {...register('email')}
            placeholder="Email address"
            className={errors.email ? classes.inputFieldError : classes.inputField}
          />
          {errors.email && <p className={classes.error}>{errors.email.message}</p>}
        </div>
        <div className={classes.inputWrapper}>
          <span className={classes.inputName}>Password</span>
          <input
            type="password"
            name="password"
            placeholder="Password"
            {...register('password')}
            className={errors.password ? classes.inputFieldError : classes.inputField}
          />
          {errors.password && <p className={classes.error}>{errors.password.message}</p>}
        </div>
        <div className={classes.inputWrapper}>
          <span className={classes.inputName}>Repeat Password</span>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Password"
            {...register('confirmPassword')}
            className={errors.confirmPassword ? classes.inputFieldError : classes.inputField}
          />
          {errors.confirmPassword && <p className={classes.error}>{errors.confirmPassword.message}</p>}
        </div>
        <div className={classes.inputWrapper}>
          <input
            type="checkbox"
            id="confirmation"
            name="confirmation"
            {...register('confirmation')}
            className={classes.customCheckbox}
          />
          <label className={classes.confirmation} htmlFor="confirmation">
            I agree to the processing of my personal information
          </label>
          {errors.confirmation && <p className={classes.error}>{errors.confirmation.message}</p>}
        </div>
        <button className={classes.btnCreate} type="submit" disabled={!isDirty || !isValid}>
          Create
        </button>
        <p className={classes.account}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </p>
      </form>
    </>
  );
};

export default SignUp;
