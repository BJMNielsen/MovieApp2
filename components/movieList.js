import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");

// Vi modtager en title og et array af movies fra vores HomeScreen når vi laver vores MovieList for enten Top rated eller Upcoming movies
export default function MovieList({ title, data: movies, hideSeeAll }) {
  const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* movie row*/}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {
          // we map through the data and return a card for each movie
          movies.map((movie, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", movie)}
              >
                {/*Display the MOVIE */}
                <View className="space-y-1 mr-4">
                  <Image
                    // source={require("../assets/moviePoster2.jpg")}
                    source={{
                      uri: image185(movie.poster_path) || fallbackMoviePoster,
                    }}
                    className="rounded-3xl"
                    style={{ width: width * 0.33, height: height * 0.22 }}
                  />
                  <Text className="text-neutral-300 ml-1">
                    {movie.title.length > 14
                      ? movie.title.slice(0, 14) + "..."
                      : movie.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })
        }
      </ScrollView>
    </View>
  );
}
