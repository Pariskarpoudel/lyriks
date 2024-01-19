import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const searchSong = createApi({
    reducerPath: 'searchSong',  // name of our api
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(shazamApi.middleware),
    baseQuery: fetchBaseQuery({
      baseUrl: "https://test-shazam.p.rapidapi.com",
      // import.meta.env.VITE_SEARCHSONGKEY
      prepareHeaders: (headers)=>{
// VITE_SEARCHSONGKEY = 6697dd9bccmshf80994ac087cbeep192a7ejsn88dcb073e654
        headers.set('X-RapidAPI-Key','6697dd9bccmshf80994ac087cbeep192a7ejsn88dcb073e654'),
        headers.set('X-RapidAPI-Host','test-shazam.p.rapidapi.com')
        return  headers;
      },
    }),
    endpoints: (builder)=>({
        getSongsBySearch: builder.query({query: ((searchterm)=>`/?text=${searchterm}`)})
    }),
})
export const {useGetSongsBySearchQuery} = searchSong