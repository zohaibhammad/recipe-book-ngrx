import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
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
  on(ShoppingListActions.ADD_INGREDIENT, (state, { ingredient }) => ({
    ...state,
    ingredients: [...state.ingredients, ingredient],
  }))
);
