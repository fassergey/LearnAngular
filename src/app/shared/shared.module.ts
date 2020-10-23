import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { ClickHandlerDirective } from './directives/click-handler.directive';


@NgModule({
  declarations: [HighlightDirective, ClickHandlerDirective],
  exports: [HighlightDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
