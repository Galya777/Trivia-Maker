import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[btnHighlight]',
})
export class HighlightDirective {
  constructor(private ele: ElementRef) {}
  @HostListener('mouseover') onHover() {
    this.ele.nativeElement.classList.add('hover');
  }

  @HostListener('mouseout') onHoverOut() {
    this.ele.nativeElement.classList.remove('hover');
  }
}