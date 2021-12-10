
export interface IUserLoginFormStandard {
  email: string;
  password: string;
}

export interface IFilmLink {
  id: number;
  appId: string;
  link: string;
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

export type AuthFormsType = 'login' | 'register';