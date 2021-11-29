import * as yup from 'yup';

const scheme = yup.object().shape({
  title: yup.string().required('The title field is required').max(40, 'The username is more  than 40 characters'),
  description: yup.string().required('The description field is required'),
  body: yup.string().required('The text field is required'),
});

export default scheme;
