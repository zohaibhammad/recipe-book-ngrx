import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// import { RecipesComponent } from './recipes/recipes.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { RecipesResolverService } from './recipes/recipes-resolver.service';
// import { AuthComponent } from './auth/auth.component';
// import { AuthGuard } from './auth/auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule), //This is for lazy loading of recipes module
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ), //This is for lazy loading of recipes module
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule), //This is for lazy loading of recipes module
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { preloadingStrategy: PreloadAllModules } //This is for pre-loading all lazy loading modules
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
