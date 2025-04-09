import { Routes } from "@angular/router";
import { ProductListComponent } from "./features/product-list/product-list.component";
import { ProductViewComponent } from "./features/product-view/product-view.component";

export const PRODUCTS_ROUTES: Routes = [
  {
    path: "list",
    component: ProductListComponent,
  },
  {
    path: "view",
    component: ProductViewComponent,
  },
  { path: "**", redirectTo: "list" },
];
