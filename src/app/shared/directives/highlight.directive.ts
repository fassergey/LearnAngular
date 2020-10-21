import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @HostBinding('class')
  attrClass = 'highlighting';

  private color = 'lightgreen';

  constructor(private el: ElementRef) {
    console.log('HighlightDirective');
   }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.highlight(this.color);
  }

  @HostListener('mouseleave')
  leave(): void {
    this.highlight(null);
  }

  private highlight(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
