import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
// const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'eecc8f0018mshb1e469686d439bbp147c89jsn4290ae04b05b',
//       'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
//     }
//   };
  
//   fetch('https://shazam.p.rapidapi.com/charts/track', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

export const shazamApi = createApi({
    reducerPath: 'shazamApi',  // name of our api
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(shazamApi.middleware),
    baseQuery: fetchBaseQuery({
      baseUrl: "https://shazam.p.rapidapi.com",
      prepareHeaders: (headers)=>{
        headers.set('X-RapidAPI-Key',import.meta.env.SHAZAMKEY),
        headers.set('X-RapidAPI-Host','shazam.p.rapidapi.com')
        return  headers;
      },
    }),
    endpoints: (builder)=>({
        getTopCharts: builder.query({query: () => '/charts/track'}),
        getSongDetails: builder.query({query: ((songid)=>`/shazam-songs/get-details?id=${songid}`)}),
        getSongRelated: builder.query({query: (songid)=>`/shazam-songs/list-similarities?id=track-similarities-id-${songid}`}),
        getArtistDetails: builder.query({query: (artistId)=> `/artists/get-details?id=${artistId}`}),
        getArtistRelatedSongs: builder.query({query: (artistId)=>`/artists/get-top-songs?id=${artistId}`}),
    }),
})
export const {useGetTopChartsQuery,useGetSongDetailsQuery,useGetSongRelatedQuery,useGetArtistDetailsQuery,useGetArtistRelatedSongsQuery} = shazamApi;