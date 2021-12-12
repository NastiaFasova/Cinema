import * as Yup from 'yup';

const email = {
  email: Yup.string().email('Invalid email address').required('Required'),
};

const emailAndPassword = {
  ...email,
  password: Yup.string()
    .required('Required')
    .min(4, 'Password is too short - should be 4 chars minimum.'),
};

export const validationLoginSchema = Yup.object({
  ...emailAndPassword,
});

export const validationRegisterSchema = Yup.object({
  ...emailAndPassword,
  password2: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});