import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import authReducer from './slices/authSlice';
import alertReducer from './slices/alertSlice';
import adminReducer from './slices/adminSlice';
import { moviesApi } from '../services/film';
import { usersApi } from '../services/user';
import { hallsApi } from '../services/hall';
import { movieSessionsApi } from '../services/movie-session';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    alert: alertReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [hallsApi.reducerPath]: hallsApi.reducer,
    [movieSessionsApi.reducerPath]: movieSessionsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(moviesApi.middleware)
      .concat(usersApi.middleware)
      .concat(movieSessionsApi.middleware)
      .concat(hallsApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)