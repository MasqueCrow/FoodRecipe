import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { useNavigation } from "@react-navigation/native";
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  
  export default function MyRecipeScreen() {
    const navigation = useNavigation();
    const [recipes, setrecipes] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchrecipes = async () => {
        try {
          // Fetch recipes from AsyncStorage
          const storedRecipes = await AsyncStorage.getItem("customrecipes");
          if (storedRecipes) {
            setrecipes(JSON.parse(storedRecipes));
          }
        } catch (error) {
          console.error("Failed to fetch recipes:", error);
        } finally {
          setLoading(false); // Loading complete
        }
      };
  
      fetchrecipes();
    }, []);
  
    // Navigate to RecipesFormScreen to add a new recipe
    const handleAddrecipe = () => {
      navigation.navigate("RecipesFormScreen");
    };
  
    // Navigate to CustomRecipesScreen with selected recipe details
    const handlerecipeClick = (recipe) => {
      navigation.navigate("CustomRecipesScreen", { recipe });
    };
  
    // Delete recipe at given index from AsyncStorage and state
    const deleterecipe = async (index) => {
      try {
        const updatedrecipes = [...recipes];
        updatedrecipes.splice(index, 1); // Remove the recipe at index
        await AsyncStorage.setItem("customrecipes", JSON.stringify(updatedrecipes));
        setrecipes(updatedrecipes); // Update state
      } catch (error) {
        console.error("Failed to delete recipe:", error);
      }
    };
  
    // Navigate to RecipesFormScreen to edit a recipe, passing recipe and index
    const editrecipe = (recipe, index) => {
      navigation.navigate("RecipesFormScreen", {
        recipeToEdit: recipe,
        recipeIndex: index,
      });
    };
  
    return (
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
  
        {/* Add New Recipe Button */}
        <TouchableOpacity onPress={handleAddrecipe} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add New recipe</Text>
        </TouchableOpacity>
  
        {loading ? (
          <ActivityIndicator size="large" color="#f59e0b" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {recipes.length === 0 ? (
              <Text style={styles.norecipesText}>No recipes added yet.</Text>
            ) : (
              recipes.map((recipe, index) => (
                <View key={index} style={styles.recipeCard} testID="recipeCard">
                  {/* TouchableOpacity with testID="handlerecipeBtn" showing image and title */}
                  <TouchableOpacity
                    testID="handlerecipeBtn"
                    onPress={() => handlerecipeClick(recipe)}
                  >
                    {/* Display image only if available */}
                    {recipe.image ? (
                      <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                    ) : null}
  
                    {/* Recipe Title */}
                    <Text style={styles.recipeTitle}>{recipe.title}</Text>
  
                    {/* Recipe description preview: first 50 chars + "..." */}
                    <Text style={styles.recipeDescription} testID="recipeDescp">
                      {recipe.description
                        ? recipe.description.length > 50
                          ? recipe.description.substring(0, 50) + "..."
                          : recipe.description
                        : ""}
                    </Text>
                  </TouchableOpacity>
  
                  {/* Edit and Delete Buttons */}
                  <View style={styles.actionButtonsContainer} testID="editDeleteButtons">
                    {/* Edit Button */}
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => editrecipe(recipe, index)}
                    >
                      <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
  
                    {/* Delete Button */}
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleterecipe(index)}
                    >
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: wp(4),
      backgroundColor: "#F9FAFB",
    },
    backButton: {
      marginBottom: hp(1.5),
    },
    backButtonText: {
      fontSize: hp(2.2),
      color: "#4F75FF",
    },
    addButton: {
      backgroundColor: "#4F75FF",
      padding: wp(0.7),
      alignItems: "center",
      borderRadius: 5,
      width: 300,
      marginLeft: 500,
    },
    addButtonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: hp(2.2),
    },
    scrollContainer: {
      paddingBottom: hp(2),
      height: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      flexWrap: "wrap",
    },
    norecipesText: {
      textAlign: "center",
      fontSize: hp(2),
      color: "#6B7280",
      marginTop: hp(5),
    },
    recipeCard: {
      width: 400,
      height: 300,
      backgroundColor: "#fff",
      padding: wp(3),
      borderRadius: 8,
      marginBottom: hp(2),
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    recipeImage: {
      width: 300,
      height: 150,
      borderRadius: 8,
      marginBottom: hp(1),
    },
    recipeTitle: {
      fontSize: hp(2),
      fontWeight: "600",
      color: "#111827",
      marginBottom: hp(0.5),
    },
    recipeDescription: {
      fontSize: hp(1.8),
      color: "#6B7280",
      marginBottom: hp(1.5),
    },
    actionButtonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: hp(1),
    },
    editButton: {
      backgroundColor: "#34D399",
      padding: wp(0.5),
      borderRadius: 5,
      width: 100,
      alignItems: "center",
    },
    editButtonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: hp(1.8),
    },
    deleteButton: {
      backgroundColor: "#EF4444",
      padding: wp(0.5),
      borderRadius: 5,
      width: 100,
      alignItems: "center",
    },
    deleteButtonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: hp(1.8),
    },
  });
  