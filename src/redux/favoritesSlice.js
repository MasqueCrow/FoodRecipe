import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriterecipes: [], // Array to store favorite recipes
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      const existingIndex = state.favoriterecipes.findIndex(
        (item) => item.idFood === recipe.idFood
      );

      if (existingIndex >= 0) {
        // Recipe already exists, remove it
        state.favoriterecipes.splice(existingIndex, 1);
      } else {
        // Recipe does not exist, add it
        state.favoriterecipes.push(recipe);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
