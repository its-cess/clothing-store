import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

//create memoized selector so it only runs if the categories changes
export const selectCategories = createSelector(
  //first argument is an array of input selectors
  //what "slice" of the store do you want
  [selectCategoryReducer],
  //second argument is an output. whatever the input selector gets back,
  //that will be what the output function receives.
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
