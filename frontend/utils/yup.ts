import * as Yup from 'yup';

const email = {
  email: Yup.string().email('Invalid email address').required('Required'),
};

const emailAndPassword = {
  ...email,
  password: Yup.string()
    .required('Required')
    .min(6, 'Password is too short - should be 6 chars minimum.'),
};

export const validationLoginSchema = Yup.object({
  ...emailAndPassword,
});