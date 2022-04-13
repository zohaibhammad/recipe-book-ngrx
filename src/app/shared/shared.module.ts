import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { DropdownDirective } from './dropdown.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ModalComponent, DropdownDirective],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ModalComponent,
    DropdownDirective,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class SharedModule {}
