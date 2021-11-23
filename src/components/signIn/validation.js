import * as yup from 'yup';

const scheme = yup.object().shape({
  email: yup.string().email('Email must be valid').required('The email field is required'),
  password: yup
    .string()
    .required('The password field is required')
    .min(6, 'The password is less than 6 characters')
    .max(40, 'The password is less than 40 characters'),
});

export default scheme;
