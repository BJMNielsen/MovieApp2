import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/movieList";
import { styles } from "../theme";

const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";
var { width, height } = Dimensions.get("window");

export default function PersonScreen() {
  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false); // Const for vores hearticon.
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4]);

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Back button and heart */}
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center px-4 " +
          verticalMargin
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
          <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Person details */}
      <View>
        <View
          className="flex-row justify-center"
          style={{
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
            <Image
              source={require("../assets/castImage2.jpg")}
              style={{ height: height * 0.43, width: width * 0.74 }}
            />
          </View>
        </View>
        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
            Keanu Reeves
          </Text>
          <Text className="text-base text-neutral-500 text-center">
            London, United Kingdom
          </Text>
        </View>
        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className="text-neutral-300 text-sm">Male</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Birthday</Text>
            <Text className="text-neutral-300 text-sm">1956-02-10</Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Known for</Text>
            <Text className="text-neutral-300 text-sm">Acting</Text>
          </View>
          <View className="px-2 items-center">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300 text-sm">86.6</Text>
          </View>
        </View>
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            Keanu Charles Reeves, whose first name means "cool breeze over the
            mountains" in Hawaiian, was born September 2, 1964 in Beirut,
            Lebanon. He is the son of Patric Reeves, a showgirl and costume
            designer, and Samuel Nowlin Reeves, a geologist.
          </Text>
        </View>

        {/* Movies */}
        <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
      </View>
    </ScrollView>
  );
}
