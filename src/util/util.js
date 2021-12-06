import * as yup from 'yup';
import { format, parseISO } from 'date-fns';

import iconFavorited from '../img/favorited.svg';
import iconUnfavorited from '../img/unfavorited.svg';

export const formatDate = (date) => {
  if (date) {
    return format(parseISO(date), 'MMMM d, yyyy');
  }

  return 'NA';
};

export const parseObjects = (tagList) => {
  if (tagList.length !== 0) {
    return tagList.map((tag) => ({ tag }));
  }

  return [];
};

export const parseStrings = (tagList) => {
  if (tagList.length !== 0) {
    return tagList.filter((name) => name.tag).map((name) => name.tag);
  }

  return [];
};

export const getIcon = (liked) => {
  if (liked) {
    return iconFavorited;
  }

  return iconUnfavorited;
};

export const createArticleScheme = yup.object().shape({
  title: yup.string().required('The title field is required').max(40, 'The username is more  than 40 characters'),
  description: yup.string().required('The description field is required'),
  body: yup.string().required('The text field is required'),
});

export const signInScheme = yup.object().shape({
  email: yup.string().email('Email must be valid').required('The email field is required'),
  password: yup
    .string()
    .required('The password field is required')
    .min(6, 'The password is less than 6 characters')
    .max(40, 'The password is less than 40 characters'),
});

export const editProfileScheme = yup.object().shape({
  username: yup
    .string()
    .required('The username field is required')
    .min(3, 'The username is less than 3 characters')
    .max(20, 'The username is more  than 20 characters'),
  email: yup.string().email('Email must be valid').required('The email field is required'),
  password: yup
    .string()
    .max(40, 'The password is less than 40 characters'),
  image: yup.string().url('This does not look like an URL'),
});

export const signUpScheme = yup.object().shape({
  username: yup
    .string()
    .required('The username field is required')
    .min(3, 'The username is less than 3 characters')
    .max(20, 'The username is more  than 20 characters'),
  email: yup.string().email('Email must be valid').required('The email field is required'),
  password: yup
    .string()
    .required('The password field is required')
    .min(6, 'The password is less than 6 characters')
    .max(40, 'The password is less than 40 characters'),
  confirmPassword: yup
    .string()
    .required('Accept terms and conditions here')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  confirmation: yup.boolean().oneOf([true], 'Must accept terms and conditions'),
});
