import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualValidator } from '../pages/equalValidator.directive';  // import validator

@NgModule({
  imports: [
    CommonModule
  ],
   declarations: [
        EqualValidator
    ],
    exports: [
        EqualValidator
    ]
})
export class SharedAssetsModule { }


