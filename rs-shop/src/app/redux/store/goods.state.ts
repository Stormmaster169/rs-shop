import { IShopItem } from "src/app/models/app-models.model";

export interface IGoodsState {
  data: IShopItem[];
  loading: boolean;
  loaded: boolean;
}

export const initialGoodsState: IGoodsState = {
  data: [{
    id: "CSMV5335MC0S",
    name: "Холодильник с морозильником Beko CSMV5335MC0S",
    imageUrls: [
      "https://cdn21vek.by/img/galleries/476/171/preview/csmv5335mc0s_beko_5a3a4c5cb078c.jpeg",
      "https://cdn21vek.by/img/galleries/476/171/preview_b/csmv5335mc0s_beko_5a3a4c65101e7.jpeg"
    ],
    availableAmount: 5,
    price: 999,
    rating: 5,
    description: "Deserunt esse anim nulla consequat mollit non do occaecat in aute labore fugiat. Amet deserunt ullamco ex et ullamco. Magna irure nostrud sint enim aliqua incididunt consectetur minim mollit ad. Qui minim magna Lorem nulla officia non consequat ad officia proident laborum. Ut non nisi culpa laboris commodo ipsum laboris do ad irure Lorem nulla eiusmod.",
    isInCart: false,
    isFavorite: false,
    category: "appliances",
    subCategory: "refrigerators"
  }],
  loading: false,
  loaded: false
};
