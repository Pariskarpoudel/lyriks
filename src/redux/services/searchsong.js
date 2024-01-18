import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const searchSong = createApi({
    reducerPath: 'searchSong',  // name of our api
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(shazamApi.middleware),
    baseQuery: fetchBaseQuery({
      baseUrl: "https://test-shazam.p.rapidapi.com",
      prepareHeaders: (headers)=>{
        headers.set('X-RapidAPI-Key',`${import.meta.env.SEARCHSONGKEY}`),
        headers.set('X-RapidAPI-Host','test-shazam.p.rapidapi.com')
        return  headers;
      },
    }),
    endpoints: (builder)=>({
        getSongsBySearch: builder.query({query: ((searchterm)=>`/?text=${searchterm}`)})
    }),
})
export const {useGetSongsBySearchQuery} = searchSong