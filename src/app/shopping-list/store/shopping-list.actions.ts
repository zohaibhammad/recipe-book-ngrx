import { Action, createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

// export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export const ADD_INGREDIENT = createAction(
  '[Shopping List Component] ADD_INGREDIENT',
  props<{ ingredient: Ingredient }>()
);

export const UPDATE_INGREDIENT = createAction(
  '[Shopping List Component] UPDATE_INGREDIENT',
  props<{ ingredient: Ingredient }>()
);

// export class AddIngredient implements Action {
//   readonly type: string = ADD_INGREDIENT;
//   constructor(public payload: Ingredient) {}
// }
