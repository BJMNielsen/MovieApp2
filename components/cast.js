import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";

// Vi modtager både cast og navigation fra den komponent der bruger Cast, dvs vpres MovieScreen
export default function Cast({ cast, navigation }) {
  let personName = "Keanu Reeves";
  let characterName = "John Wick";
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {
          // Map through all the cast and return a
          cast &&
            cast.map((person, index) => {
              return (
                <TouchableOpacity key={index} className="mr-4 item-center" onPress={()=> navigation.navigate('Person', person)} >
                  <View className="overflow-hidden rounded-full h-20 w-20 item-center border border-neutral-500">
                    <Image
                      className="rounded-2xl h-24 w-20"
                      source={require("../assets/castImage1.jpg")}
                    />
                  </View>
                  <Text className="text-white text-xs mt-1">
                    {characterName.length > 10
                      ? characterName.slice(0, 10) + "..."
                      : characterName}
                  </Text>
                  <Text className="text-neutral-400 text-xs mt-1">
                    {personName.length > 10
                      ? personName.slice(0, 10) + "..."
                      : personName}
                  </Text>
                </TouchableOpacity>
              );
            })
        }
      </ScrollView>
    </View>
  );
}
