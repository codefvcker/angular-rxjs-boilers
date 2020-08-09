import {
  map,
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  takeUntil,
} from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {
  Component,
  OnInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-search-two',
  templateUrl: './search-two.component.html',
  styleUrls: ['./search-two.component.scss'],
})
export class SearchTwoComponent implements OnInit {
  search$: Observable<any> = new Observable((observer) => {
    console.log('observer works?', observer.closed);

    const input = document.querySelector('.input');

    const onSearch = (e) => {
      observer.next((e.target as HTMLInputElement).value);

      observer.complete();

      console.log('observer works 2?', observer.closed);

      clearSearch();
    };

    input.addEventListener('keyup', onSearch);

    // unsubscribe from event
    const clearSearch = () => {
      console.log('da');
      input.removeEventListener('keyup', onSearch);
    };

    console.log('end in observable');
  });

  constructor() {}

  ngOnInit(): void {
    this.search$
      .pipe(
        map((value: string) => (value.length <= 3 ? '' : value)),
        debounceTime(800),
        distinctUntilChanged()
        // takeUntil(stop$) // optional moment which shows how we can stop or influence on stream using another stream
      )
      .subscribe((d) => console.log(d));
  }
}
