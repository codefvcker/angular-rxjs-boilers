import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { fromEvent, Observable, Subscription, of, EMPTY, interval } from 'rxjs';
import {
  map,
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  scan,
} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput')
  input: ElementRef;

  @ViewChild('startBtn')
  start: ElementRef;

  test$: Observable<boolean | number>;
  stream$: Observable<string>;
  subscription: Subscription = new Subscription();
  value: string;
  counter: number | boolean = 0;

  constructor() {}

  ngOnInit(): void {}

  query(text: string) {
    return of(`Query running, text is - ${text}`);
  }

  ngAfterViewInit() {
    this.stream$ = fromEvent<any>(this.input.nativeElement, 'keyup').pipe(
      map((e) => e.target.value),
      // startWith(''),
      debounceTime(800),
      distinctUntilChanged(),
      switchMap((i) => this.query(i))
    );

    this.subscription.add(
      this.stream$.subscribe((value) => (this.value = value))
    );

    // below doesnt make search it s just for practice

    this.test$ = fromEvent(this.start.nativeElement, 'click').pipe(
      scan((acc) => !acc, true),
      startWith(true),
      switchMap((i) => (i ? EMPTY : interval(1000)))
    );

    this.subscription.add(
      this.test$.subscribe((data) => (this.counter = data))
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
