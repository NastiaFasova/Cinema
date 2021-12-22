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
  firstname: Yup.string()
    .required('Required')
    .max(10, 'FirstName is too long')
    .min(4, 'FirstName is too short'),
  lastname: Yup.string()
    .required('Required')
    .max(10, 'LastName is too long')
    .min(4, 'LastName is too short'),
  repeatPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export const validationMovieLinkSchema = Yup.object({
  apiId: Yup.string().required('Required')
    .length(9, 'The length is not matching for template')
    .matches(/^tt+\d/, 'Must starts with "tt" and ends with numbers'),
  link: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
});

export const validationHallSchema = Yup.object({
  capacity: Yup.number().required('Required').min(50, '50 is minimumu').max(150, '150 is maximum'),
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required').min(20, '20 symbols is required'),
});

export const validationMovieSessionSchema = Yup.object({
  movieTitle: Yup.string().required('Required').nullable(),
  cinemaHallId: Yup.string().required('Required'),
  showTime: Yup.date().required('Required'),
  price: Yup.number().required('Required').min(5, '5 is minimumu').max(100, '100 is maximum'),
  maxTicketCount: Yup.number().required('Required').min(50, '50 is minimumu').max(150, '150 is maximum'),
});

export const validationAccountTopUpSchema = Yup.object({
  money: Yup.number().required('Required').min(50, '100 is minimumu').max(1000, '1000 is maximum'),
});