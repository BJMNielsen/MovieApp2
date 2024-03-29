import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fallbackMoviePoster,
  fetchMovieDetails,
  image500,
} from "../api/moviedb";
import {
  fetchMovieCredits,
  fetchTopRatedMovies,
  fetchSimilarMovies,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios"; // const til at tjekke om platform er IOS
const topMargin = ios ? "" : " mt-3"; // Margin til android platform, så vores icons kan ses på MovieScreen

export default function MovieScreen() {
  const { params: recievedMovie } = useRoute(); // Her får vi fat i den film, vi lige har passet, når vi trykker på en film og går ind på dens side.
  const [isFavourite, toggleFavourite] = useState(false); // Const for vores hearticon.
  const navigation = useNavigation();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    // call api for movie details whenever the above param recievedMovie changes.
    // console.log("item id/movie id: ", recievedMovie.id);
    setLoading(true);
    getMovieDetails(recievedMovie.id);
    getMovieCredits(recievedMovie.id);
    getSimilarMovies(recievedMovie.id);
  }, [recievedMovie]); // Dependency Array ([item]): The useEffect hook is set to run whenever the item object changes. In this context, item seems to be derived from useRoute, likely representing the current route's parameters, which includes details about a selected movie (such as its ID).

  // FETCH MOVIE DETAILS \\
  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    // console.log("got movie details: ", data);
    // We check if we get the data, and only then setMovie
    if (data) {
      setMovie(data);
    }
    setLoading(false);
  };

  // FETCH MOVIE CREDITS(CAST) \\
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    // console.log("got movie credits: ", data);
    if (data && data.cast) {
      setCast(data.cast);
    }
    setLoading(false);
  };

  // FETCH SIMILAR MOVIES \\
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    // console.log("got similar movies: ", data);
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
    setLoading(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* BACK button and HEART/favorite icon and also the MOVIE POSTER*/}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4 " +
            topMargin
          }
        >
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <HeartIcon
              size="35"
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {
          // when there is loading we show the loading component, otherwise we show the movieposter and gradient
          loading ? (
            <Loading />
          ) : (
            <View>
              <Image
                // source={require("../assets/moviePoster2.jpg")}
                source={{
                  uri: image500(movie?.poster_path) || fallbackMoviePoster,
                }}
                style={{ width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23, 23, 23, 0.8)",
                  "rgba(23, 23, 23, 1)",
                ]}
                style={{ width, height: height * 0.4 }}
                start={{ x: 0.5, y: -0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>
          )
        }
      </View>

      {/* Movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* Title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movie?.title}
        </Text>
        {/* Status, release date, runtime */}
        {movie?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie?.status} | {movie?.release_date?.split("-")[0]} |{" "}
            {movie?.runtime} min
          </Text>
        ) : null}

        {/* Genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie.genres.length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre?.name} {showDot ? "|" : null}
              </Text>
            );
          })}

          {/*<Text className="text-neutral-400 font-semibold text-base text-center">
            Thriller |
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text>*/}
        </View>

        {/* Description for movie */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.overview}
        </Text>
      </View>

      {/* Cast , we will pass the cast members as an array*/}
      {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}

      {/* Similar movies*/}
      {similarMovies.length > 0 && (
        <MovieList
          title="Similar Movies"
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
}
