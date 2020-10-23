import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickHandler]'
})
export class ClickHandlerDirective {
  private color = 'yellow';

  constructor(private el: ElementRef) { }

  @HostListener('click')
  onMouseClick(): void {
    this.el.nativeElement.style.backgroundColor = this.color;
  }
}
