import { Action, createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

// export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export const ADD_INGREDIENT = createAction(
  '[Shopping List Component] ADD_INGREDIENT',
  props<{ payload: Ingredient }>()
);

export const ADD_INGREDIENTS = createAction(
  '[Shopping List Component] ADD_INGREDIENTS',
  props<{ payload: Ingredient[] }>()
);

export const UPDATE_INGREDIENT = createAction(
  '[Shopping List Component] UPDATE_INGREDIENT',
  props<{ payload: Ingredient }>()
);

export const DELETE_INGREDIENT = createAction(
  '[Shopping List Component] DELETE_INGREDIENT'
);

export const START_EDIT = createAction(
  '[Shopping List Component] START_EDIT',
  props<{ payload: number }>()
);

export const STOP_EDIT = createAction('[Shopping List Component] STOP_EDIT');

// export class AddIngredient implements Action {
//   readonly type: string = ADD_INGREDIENT;
//   constructor(public payload: Ingredient) {}
// }
