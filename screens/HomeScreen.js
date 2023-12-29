import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import {
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from "../api/moviedb";

const ios = Platform.OS == "ios";

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  // Metode til at fetche trending movies
  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log("got trending movies: ", data);
    // Nu bruger vi dataen til at sætte ind i vores trending list
    // dvs hvis vi har data, og data har results, så bruger vi setTrending til at smide dataen ind i vores liste
    if (data && data.results) {
      setTrending(data.results);
    }
    setLoading(false);
  };

  // Metode til at fetche upcoming movies
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    // console.log("got upcoming movies: ", data);
    // Nu bruger vi dataen til at sætte ind i vores upcoming list
    // dvs hvis vi har data, og data har results, så bruger vi setUpcoming til at smide dataen ind i vores liste
    if (data && data.results) {
      setUpcoming(data.results);
    }
  };

  // Metode til at fetche toprated movies
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    // console.log("got trending movies: ", data);
    // Nu bruger vi dataen til at sætte ind i vores topRated list
    // dvs hvis vi har data, og data har results, så bruger vi setTopRated til at smide dataen ind i vores liste
    if (data && data.results) {
      setTopRated(data.results);
    }
  };

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar and logo */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3 mt-2"}>
        <View className="flex-row justify-between items-center mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl fontbold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {
        // when the loading is true we show the loading component, otherwise we show the scrollview.
        loading ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            {/* Trending movies carousel
            Vi laver lige et check først og ser om vi har trending movies, og viser kun vores component hvis vi har
            */}
            {trending.length > 0 && <TrendingMovies data={trending} />}

            {/* Upcoming movies row */}
            <MovieList title="Upcoming Movies" data={upcoming} />

            {/* Top rated movies */}
            <MovieList title="Top Rated Movies" data={topRated} />
          </ScrollView>
        )
      }
    </View>
  );
}
