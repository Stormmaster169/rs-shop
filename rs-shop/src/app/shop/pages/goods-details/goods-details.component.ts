import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IShopItem } from 'src/app/models/app-models.model';

@Component({
  selector: 'app-goods-details',
  templateUrl: './goods-details.component.html',
  styleUrls: ['./goods-details.component.scss']
})
export class GoodsDetailsComponent implements OnInit {

  public item: Observable<IShopItem>;

  constructor(
    private route: ActivatedRoute,
    ) {}

  public ngOnInit(): void {
    this.item = this.route.data.pipe(map(d => d.item));
  }
}
