import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    // CommonModule,
    SharedModule,
    ShoppingListRoutingModule,
    FormsModule,
  ],
})
export class ShoppingListModule {}
