import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowOrHide]'
})
export class ShowOrHideDirective {

  constructor(private el: ElementRef, private r: Renderer2) { }

  @HostListener('click') onMouseEnter() {
    if (this.el.nativeElement.classList.contains('conf-step__header_closed')) {
      this.r.removeClass(this.el.nativeElement, 'conf-step__header_closed');
      this.r.addClass(this.el.nativeElement, 'conf-step__header_opend');
    } else {
      this.r.removeClass(this.el.nativeElement, 'conf-step__header_opend');
      this.r.addClass(this.el.nativeElement, 'conf-step__header_closed');
    }
  }
}
