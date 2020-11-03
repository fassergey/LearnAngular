import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from './directives/highlight.directive';
import { ClickHandlerDirective } from './directives/click-handler.directive';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  declarations: [HighlightDirective, ClickHandlerDirective, OrderByPipe],
  exports: [HighlightDirective, ClickHandlerDirective, OrderByPipe],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
