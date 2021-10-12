import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/app-models.model';
import { catalogResultSelector } from 'src/app/redux/selectors/catalog.selector';
import { IAppState } from 'src/app/redux/store/state';

@Component({
  selector: 'app-main-categories',
  templateUrl: './main-categories.component.html',
  styleUrls: ['./main-categories.component.scss']
})
export class MainCategoriesComponent implements OnInit {

  public catalogs$: Observable<ICategory[]>;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.catalogs$ = this.store.select(catalogResultSelector);
  }

}
