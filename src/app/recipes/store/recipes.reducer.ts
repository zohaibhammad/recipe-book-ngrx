import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipes.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export const recipesReducer = createReducer(
  initialState,
  on(RecipesActions.SET_RECIPES, (state, { payload }) => ({
    ...state,
    recipes: [...payload],
  })),
  on(RecipesActions.ADD_RECIPE, (state, { payload }) => ({
    ...state,
    recipes: [...state.recipes, payload],
  })),
  on(RecipesActions.UPDATE_RECIPE, (state, { payload }) => ({
    ...state,
    recipes: state.recipes.map((value, index) =>
      index === payload.index ? { ...payload.recipe } : value
    ),
  })),
  on(RecipesActions.DELETE_RECIPE, (state, { payload }) => ({
    ...state,
    recipes: state.recipes.filter((value, index) => index !== payload),
  }))
);
