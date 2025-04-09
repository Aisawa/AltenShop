import { Routes } from "@angular/router";
import { HomeComponent } from "./shared/features/home/home.component";
import { LoginComponent } from "./account/login/login.component";
import { CanDeactivateGuard } from "./guards/can-deactivate-guard.guard";
import { LoginGuard } from "./guards/can-activate.guard";

export const APP_ROUTES: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: "products",
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES),
    canActivate: [LoginGuard],
  },
  {
    path: "products-view",
    loadChildren: () =>
      import("./products/products.routes").then((m) => m.PRODUCTS_ROUTES),
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
];
