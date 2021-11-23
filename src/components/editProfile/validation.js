import * as yup from 'yup';

const scheme = yup.object().shape({
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
  image: yup.string().url('This does not look like an URL'),
});

export default scheme;
