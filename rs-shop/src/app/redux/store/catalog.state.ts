import { ICategory } from "src/app/models/app-models.model";

export interface ICatalogState {
  data: ICategory[];
  loading: boolean;
  loaded: boolean;
}

export const initialCatalogState: ICatalogState = {
  data: [{
      id: "appliances",
      name: "Бытовая техника",
      subCategories: [{
        id: "refrigerators",
        name: "Холодильники"
      }]
    }
  ],
  loading: false,
  loaded: false
};
