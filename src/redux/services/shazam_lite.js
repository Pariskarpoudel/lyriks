import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const shazamLite = createApi({
    reducerPath: 'shazamLite',  // name of our api
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(shazamApi.middleware),
    baseQuery: fetchBaseQuery({
      baseUrl: "https://shazam-api7.p.rapidapi.com",
      prepareHeaders: (headers)=>{
// VITE_SHAZAMLITEKEY = eecc8f0018mshb1e469686d439bbp147c89jsn4290ae04b05b
        headers.set('X-RapidAPI-Key','eecc8f0018mshb1e469686d439bbp147c89jsn4290ae04b05b'),
        headers.set('X-RapidAPI-Host','shazam-api7.p.rapidapi.com')
        return  headers;
      },
    }),
    endpoints: (builder)=>({
        getSongsByGenre: builder.query({query: ((genre)=>`/charts/get-top-songs-in_world_by_genre?genre=${genre}&limit=25`)}),
  
    }),
})
export const {useGetSongsByGenreQuery} = shazamLite;