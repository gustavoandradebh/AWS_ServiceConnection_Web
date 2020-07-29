import { Component, OnInit, OnDestroy, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html'
})
export class InfiniteScrollComponent implements OnInit, OnDestroy {

  @Input() options = {};
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;

  private observer: IntersectionObserver;

  constructor(private host: ElementRef) { }

  get element() {
    return this.host.nativeElement;
  }

  ngOnInit(): void {
    const options = {
      root: null,
      ...this.options
    };
  
    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit();
    }, options);
  }

  ngAfterViewInit() {  
    this.observer.observe(this.anchor.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
