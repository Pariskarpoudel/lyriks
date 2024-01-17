import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazamApi } from './services/shazam';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { shazamLite } from './services/shazam_lite';
import { searchSong } from './services/searchsong';
export const store = configureStore({
  reducer: {
    [shazamApi.reducerPath]: shazamApi.reducer, // create api wala lai esari jo lekhxan
    [shazamLite.reducerPath]: shazamLite.reducer,
    [searchSong.reducerPath]: searchSong.reducer,
    player: playerReducer,  // store = {player: {}, .....}
  }
});
