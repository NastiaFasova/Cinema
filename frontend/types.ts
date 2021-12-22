
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

export interface IFilm extends IFilmLink {
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
  imdbID: string;
}

export interface ICinemaHall {
  id: number;
  capacity: number;
  title: string;
  description: string;
}

export interface ICinemaSession {
  id: number;
  movieSessionId: number;
  movieTitle: string;
  cinemaHallId: string;
  apiId: string;
  description: string;
  image: string;
  price?: number;
  showTime: string | Date; //toLocaleDateString()
}

export interface IUserProfile {
  id: string;
  email: string;
  blocked: boolean;
  token: string;
  jwtToken: string;
  firstname: string;
  lastname: string;
  role: 'ADMIN' | 'USER' | null;
  avatarUrl?: string;
  bill: number;
}

export type SelectType = {
  key: string;
  value: string | number;
};

export type AuthFormsType = 'login' | 'register';

export interface ICartItem {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};