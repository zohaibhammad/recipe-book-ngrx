import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = createAction(
  '[Recipes Component] SET_RECIPES',
  props<{ payload: Recipe[] }>()
);

export const FETCH_RECIPES = createAction('[Recipes Component] FETCH_RECIPES');

export const ADD_RECIPE = createAction(
  '[Recipes Component] ADD_RECIPE',
  props<{ payload: Recipe }>()
);

export const UPDATE_RECIPE = createAction(
  '[Recipes Component] UPDATE_RECIPE',
  props<{ payload: { index: number; recipe: Recipe } }>()
);

export const DELETE_RECIPE = createAction(
  '[Recipes Component] DELETE_RECIPE',
  props<{ payload: number }>()
);

export const STORE_RECIPES = createAction('[Recipes Component] STORE_RECIPES');
