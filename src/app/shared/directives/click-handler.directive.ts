import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appClickHandler]'
})
export class ClickHandlerDirective {
  @Input('appClickHandler') color: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click')
  onMouseClick(): void {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', this.color || 'yellow');
  }
}
