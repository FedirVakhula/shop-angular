import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[[appHighlight], [appCartItem], [scroll]]'
})
export class HighlightDirective {
  @Input('appHighlight') color: string;

  @HostBinding('class')
  attrClass = 'headingClass';

  @HostListener('mouseenter')
  enter(): void {
    this.highlight(this.color);
  }

  @HostListener('mouseleave')
  leave(): void {
    this.highlight('');
  }

  constructor(private el: ElementRef, private render: Renderer2) { }

  private highlight(color: string = 'lightgreen'): void {
    this.render.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }

}
