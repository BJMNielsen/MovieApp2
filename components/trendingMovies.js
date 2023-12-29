import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/moviedb";

var { width, height } = Dimensions.get("window");

// The TrendingMovies component receives data as a prop. This data is an array of movie objects.
export default function TrendingMovies({ data }) {
  const navigation = useNavigation();
  const handleClick = (item) => {
    navigation.navigate("Movie", item);
  };

  //  The Carousel takes the data array and renders each element using the renderItem prop.
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
}
// MovieCard Component: The renderItem function renders a MovieCard component for each movie. It passes the item (the movie object) and a handleClick function to MovieCard.
const MovieCard = ({ item, handleClick }) => {
  // console.log("item.poster_path: ", item.poster_path); // vi tjekker om vi får fat i vores poster paths
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        // source={require("../assets/moviePoster1.jpg")}
        source={{ uri: image500(item.poster_path) }} // Her kalder vi vores image fetch metode der skaffer billeder ud fra en imagepath fra movieDB hjemmesiden.
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
