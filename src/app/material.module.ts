import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

let data: any = [MatToolbarModule, MatButtonModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDialogModule];

@NgModule({
  imports: data,
  exports: data
})
export class MaterialModule { }
