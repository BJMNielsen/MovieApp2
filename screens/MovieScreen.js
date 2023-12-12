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

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios"; // const til at tjekke om platform er IOS
const topMargin = ios ? "" : " mt-3"; // Margin til android platform, så vores icons kan ses på MovieScreen

export default function MovieScreen() {
  const { params: item } = useRoute(); // Her får vi fat i den film, vi lige har passet, når vi trykker på en film og går ind på dens side.
  const [isFavourite, toggleFavourite] = useState(false); // Const for vores hearticon.
  const navigation = useNavigation();
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  let movieName = "Ant-man and the Wasp: Quantumania";

  useEffect(() => {
    // call api for movie details whenever the above params changes
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
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
        <View>
          <Image
            source={require("../assets/moviePoster2.jpg")}
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
      </View>

      {/* Movie details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* Title */}
        <Text className="text-white text-center text-3xl font-bold tracking-wider">
          {movieName}
        </Text>
        {/* Status, release date, runtime */}
        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released | 2020 | 170 min
        </Text>
        {/* Genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action |
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thriller |
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text>
        </View>
        {/* Description for movie */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          Scott Lang and Hope Van Dyne are dragged into the Quantum Realm, along
          with Hope's parents and Scott's daughter Cassie. Together they must
          find a way to escape, but what secrets is Hope's mother hiding? And
          who is the mysterious Kang?
        </Text>
      </View>

      {/* Cast , we will pass the cast members as an array*/}
      <Cast navigation={navigation} cast={cast} />

      {/* Similar movies*/}
      <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />


    </ScrollView>
  );
}
