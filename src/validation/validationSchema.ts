import * as Yup from 'yup';
import useEmailRouteValidator from '../hooks/useEmailRouteValidator';

export type FormValues = Yup.InferType<typeof inputValidationSchema>;

export const inputValidationSchema = Yup.object().shape({
  input: Yup.string()
    .email('Invalid email format')
    .required('Input is required')
    .test('emailTaken', 'Email already taken', (value) => {
      return !useEmailRouteValidator(value);
    }),
  selection: Yup.string().required('Input is required'),
});
