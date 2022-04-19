import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredientIndex: -1,
};

// export function shoppingListReducer(
//   state = initialState,
//   action: ShoppingListActions.AddIngredient
// ) {
//   switch (action.type) {
//     case ShoppingListActions.ADD_INGREDIENT:
//       return {
//         ...state,
//         ingredients: [...state.ingredients, action.payload],
//       };

//     default:
//       return {
//         ...state,
//       };
//   }
// }

export const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.ADD_INGREDIENT, (state, { payload }) => ({
    ...state,
    ingredients: [...state.ingredients, payload],
  })),
  on(ShoppingListActions.ADD_INGREDIENTS, (state, { payload }) => ({
    ...state,
    ingredients: [...state.ingredients, ...payload],
  })),
  on(ShoppingListActions.UPDATE_INGREDIENT, (state, { payload }) => ({
    ...state,
    editedIngredientIndex: -1,
    ingredients: state.ingredients.map((value, index) =>
      index === state.editedIngredientIndex ? { ...payload } : value
    ),
  })),
  on(ShoppingListActions.DELETE_INGREDIENT, (state, action) => ({
    ...state,
    ingredients: state.ingredients.filter(
      (value, index) => index !== state.editedIngredientIndex
    ),
    editedIngredientIndex: -1,
  })),
  on(ShoppingListActions.START_EDIT, (state, { payload }) => ({
    ...state,
    editedIngredientIndex: payload,
  })),
  on(ShoppingListActions.STOP_EDIT, (state, action) => ({
    ...state,
    editedIngredientIndex: -1,
  }))
);
