import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { selectCurrentErrorMessage } from '../../store/server-errors.selector';
import { AppState } from '../../store/app-state';
import { filter, of } from 'rxjs';
import { ErrorState } from '../../store/server-errors.reducer';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss'
})
export class ServerErrorComponent implements OnInit{

  error$: Observable<string | null> = of(null);

  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.error$ = this.store.select(selectCurrentErrorMessage);
  }

}
