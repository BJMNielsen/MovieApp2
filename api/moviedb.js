import axios from "axios";
import { apiKey } from "../constants";

// api endpoints to call the data from
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingsMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
//                  https://api.themoviedb.org/3/search/movie
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

// DYNAMIC ENDPOINTS
//                  https://api.themoviedb.org/3/movie/movie_id
const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
//                  https://api.themoviedb.org/3/movie/movie_id/credits
const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
//                  https://api.themoviedb.org/3/movie/movie_id/similar
const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

// person
const personDetailsEndpoint = (id) =>
  //   url: 'https://api.themoviedb.org/3/person/person_id',
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
//   url: 'https://api.themoviedb.org/3/person/person_id/movie_credits',
const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

// Vi laver en funktion til at fetche vores poster images i størrelse 500, eller null
export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

// Vi skal også lave en fallback movieposter og personimage til film der IKKE har en tilknyttet i moviedatabasen
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

// async Metode til at kalde endpoints ovenover
// den saver endpointed og dets parameters
const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint, // endpoint er det endoint vi passer metoden.
    params: params ? params : {}, // vi tjekker om vi har parametrene og passer den kun hvis vi har dem.
  };

  try {
    // vi kalder api'en og får et response
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

// funktion til at kalde trending endpoints
// vi passer ikke noget til denne
export const fetchTrendingMovies = () => {
  return apiCall(trendingsMoviesEndpoint);
};

// funktion til at kalde upcoming movies endpoints
// vi passer ikke noget til denne
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};

// funktion til at kalde top rated movies endpoints
// vi passer ikke noget til denne
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

// funktioner til at fetche data fra vores dynamiske endpoints
export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndpoint(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndpoint(id));
};

export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params); // kalder apiCall med de parametre vi får fra komponenten (SearchScreen)
};
