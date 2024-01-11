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

var { width, height } = Dimensions.get("window"); // skaffer os dimensionerne på vores device

// The TrendingMovies component receives data as a prop. This data is a JSON object with a list of trending movies from the trending movies api call performed in the HomeScreen.
export default function TrendingMovies({ data: trendingMovies }) {
  const navigation = useNavigation();
  const handleClick = (movie) => {
    navigation.navigate("Movie", movie);
  };

  //  The Carousel takes the data array and renders each element using the renderItem prop.
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={trendingMovies}
        renderItem={({ item: movie }) => (
          <MovieCard movie={movie} handleClick={handleClick} /> // passer 2 props, movie og handleClick
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
// modtager de 2 props
const MovieCard = ({ movie, handleClick }) => {
  // console.log("item.poster_path: ", item.poster_path); // vi tjekker om vi får fat i vores poster paths
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(movie)}>
      <Image
        // source={require("../assets/moviePoster1.jpg")}
        source={{ uri: image500(movie.poster_path) }} // Her kalder vi vores image fetch metode der skaffer billeder ud fra en imagepath fra movieDB hjemmesiden.
        style={{
          width: width * 0.6,
          height: height * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
