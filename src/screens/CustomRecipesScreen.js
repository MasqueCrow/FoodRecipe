import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
  } from "react-native";
  import React from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { useDispatch, useSelector } from "react-redux";
  import { toggleFavorite } from "../redux/favoritesSlice";
  
  export default function CustomRecipesScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const route = useRoute();
    const { recipe, index = 0 } = route.params || {};
  
    const favoriteRecipes = useSelector(
      (state) => state.favorites.favoriterecipes
    );
  
    const isFavourite = favoriteRecipes.some(
      (fav) => fav.idFood === recipe?.idFood
    );
  
    if (!recipe) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>No Recipe Details Available</Text>
        </View>
      );
    }
  
    const handleToggleFavorite = () => {
      dispatch(toggleFavorite(recipe));
    };
  
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        testID="scrollContent"
      >
        {/* Updated Image component inside View with testID="imageContainer" */}
        <View style={styles.imageContainer} testID="imageContainer">
          {recipe.image ? (
            <Image
              source={{ uri: recipe.image }}
              // Added dynamic height based on index % 3 condition
              style={[
                styles.recipeImage,
                { height: index % 3 === 0 ? hp(25) : hp(35) },
              ]}
            />
          ) : null}
        </View>
  
        <View style={styles.topButtonsContainer} testID="topButtonsContainer">
          {/* First TouchableOpacity: Go Back button */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text>Go Back</Text>
          </TouchableOpacity>
  
          {/* Second TouchableOpacity: Favorite toggle button with heart symbol */}
          <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
            <Text>{isFavourite ? "♥" : "♡"}</Text>
          </TouchableOpacity>
        </View>
  
        {/* Added recipe title and description inside View with testID="contentContainer" */}
        <View style={styles.contentContainer} testID="contentContainer">
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Content</Text>
            <Text style={styles.contentText}>{recipe.description}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
  
  // ...styles remain unchanged
  