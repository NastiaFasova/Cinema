
export interface IUserAuthFormStandard {
  email: string;
  password: string;
}

export interface IFilmLink {
  id: number;
  apiId: string;
  link: string;
  title: string;
}

export interface IFilm {
  id: number;
  Title: string;
  Year: number;
  Rated: string;
  Released: string | Date;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: { Source: string; Value: string; }[]
  imdbRating: string;
  imdbVotes: string;
}

export interface ICinemaHall {
  id: number;
  capacity: number;
  title: string;
  description: string;
}

export interface ICinemaSession {
  id: number;
  film: string;
  hall: string;
  date: string; //toLocaleDateString()
}

export interface IUser {
  email: string;
  token: string;
  jwtToken: string;
  role: 'ADMIN' | 'USER' | null;
}

export type SelectType = {
  key: string;
  value: string | number;
};

export type AuthFormsType = 'login' | 'register';
