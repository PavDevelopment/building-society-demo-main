import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialUIModule } from './ng-material-ui/ng-material.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialUIModule
  ],
  exports: [
    CommonModule,
    AngularMaterialUIModule
  ]
})
export class SharedModule { }
