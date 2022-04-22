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
  }))
);
