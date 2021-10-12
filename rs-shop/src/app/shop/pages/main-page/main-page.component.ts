import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IShopItem } from 'src/app/models/app-models.model';
import { catalogResultSelector } from 'src/app/redux/selectors/catalog.selector';
import { IAppState } from 'src/app/redux/store/state';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  public carouselItems: IShopItem[];

  public subscriptions: Subscription = new Subscription();

  public responsiveOptions = [
    {
      breakpoint: '1366px',
      numVisible: 5,
      numScroll: 5
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  public data = [
    {
      title: 'Гарантия качества',
      description: 'Мы продаем только сертифицированный товар с гарантией сервисных центров, чек прилагается.',
      imgUrl: '../../../../assets/adventage-1.jpg',
      name: 'guarantees'
    },
    {
      title: 'Честные цены',
      description: 'Все цены, указанные на сайте, действительны и актуальны — данные обновляются автоматически.',
      imgUrl: '../../../../assets/adventage-2.jpg',
      name: 'prices'
    },
    {
      title: 'Доставка по всей Беларуси',
      description: 'Мы доставляем заказы в Минск, Брест, Витебск, Гомель, Гродно, Могилев и в любую другую точку Беларуси!',
      imgUrl: '../../../../assets/adventage-3.jpg',
      name: 'delivery'
    },
    {
      title: 'Кредит «не выходя из дома»',
      description: 'Вы можете выбрать кредит среди предложений ведущих банков, рассчитать и оформить его, не выходя из дома.',
      imgUrl: '../../../../assets/adventage-4.jpg',
      name: 'credit'
    },
    {
      title: 'Надежный сервис',
      description: 'Мы предлагаем услуги по сборке, установке, настройке, гарантийному и послегарантийному обслуживанию товаров.',
      imgUrl: '../../../../assets/adventage-5.jpg',
      name: 'service'
    },
    {
      title: 'Выгодные покупки',
      description: 'Наш онлайн-гипермаркет предлагает вам выгодные акции, скидки и собственную бонусную программу.',
      imgUrl: '../../../../assets/adventage-6.jpg',
      name: 'purchases'
    },
  ]

  @ViewChild('cardGuarantees', { static: true }) cardGuarantees: TemplateRef<any>;
  @ViewChild('cardPrices', { static: true }) cardPrices: TemplateRef<any>;
  @ViewChild('cardDelivery', { static: true }) cardDelivery: TemplateRef<any>;
  @ViewChild('cardCredit', { static: true }) cardCredit: TemplateRef<any>;
  @ViewChild('cardService', { static: true }) cardService: TemplateRef<any>;
  @ViewChild('cardPurchases', { static: true }) cardPurchases: TemplateRef<any>;

  constructor(
    private store: Store<IAppState>,
    private shopService: ShopService,
    ) { }

  public ngOnInit(): void {
    this.subscriptions.add(this.store.select(catalogResultSelector).subscribe(categories => {
      this.carouselItems = []
      let carouselItems: IShopItem[] = [];
      categories.map(category => {
        category.subCategories.map(subCategory => {
          this.shopService.getSubCategoryAllItemsByCategory(category.id, subCategory.id).subscribe(res => {
            if (res.sort((a, b) => a.rating > b.rating ? -1 : 1)[1].rating === 5) {
              carouselItems = [...carouselItems, res.sort((a, b) => a.rating > b.rating ? -1 : 1)[1]]
              this.carouselItems = carouselItems
            }
          })
        })
      })
    }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getSelectedComponentTemplate(name: string) {
    switch (name) {
      case 'guarantees':
        return this.cardGuarantees;
      case 'prices':
        return this.cardPrices;
      case 'delivery':
        return this.cardDelivery;
      case 'credit':
        return this.cardCredit;
      case 'service':
        return this.cardService;
      case 'purchases':
        return this.cardPurchases;
      default:
        return null;
    }
  }

}
