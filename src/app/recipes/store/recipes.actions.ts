import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = createAction(
  '[Recipes Component] SET_RECIPES',
  props<{ payload: Recipe[] }>()
);
