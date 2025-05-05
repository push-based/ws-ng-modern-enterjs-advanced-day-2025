import {
  Directive,
  ElementRef,
  EventEmitter,
  NgZone,
  Output,
} from '@angular/core';
import { filter, fromEvent, map } from 'rxjs';

@Directive({
  selector: '[elementVisible]',
})
export class ElementVisibilityDirective {
  @Output() elementVisible = new EventEmitter<void>();

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private zone: NgZone,
  ) {
    this.zone.runOutsideAngular(() => {
      fromEvent(document, 'scroll')
        .pipe(
          filter(() => !!document.scrollingElement),
          map(() => {
            const { scrollTop, clientHeight } = document.scrollingElement!;
            return (
              scrollTop + clientHeight + 100 >=
              this.elementRef.nativeElement.offsetTop
            );
          }),
          filter(Boolean),
        )
        .subscribe(() => {
          this.zone.run(() => {
            this.elementVisible.emit();
          });
        });
    });
  }
}
