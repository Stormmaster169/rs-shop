import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ICategory, ISubCategory } from 'src/app/models/app-models.model';
import { getCategoriesItems } from 'src/app/redux/actions/catalog.actions';
import { catalogResultSelector } from 'src/app/redux/selectors/catalog.selector';
import { IAppState } from 'src/app/redux/store/state';

@Component({
  selector: 'app-goods-catalog',
  templateUrl: './goods-catalog.component.html',
  styleUrls: ['./goods-catalog.component.scss']
})
export class GoodsCatalogComponent implements OnInit {

  public catalogs$: Observable<ICategory[]>;

  public catalogs: ICategory[];

  private subscriptions: Subscription = new Subscription;

  public selectedCategory: ICategory;

  public selectedCategories: ISubCategory[];

  constructor(
    private store: Store<IAppState>,
    ) {
    this.store.dispatch(getCategoriesItems());
    this.catalogs$ = this.store.select(catalogResultSelector);
  }

  public ngOnInit() {
    this.subscriptions.add(this.catalogs$.subscribe((res) => {
      this.catalogs = res
      this.selectedCategory = this.catalogs[0]
      this.selectedCategories = this.catalogs[0].subCategories
    }));
  }
}
