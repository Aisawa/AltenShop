import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Product } from "../../data-access/product.model";
import { ProductsService } from "../../data-access/products.service";

// PrimeNG Imports
import { DataViewModule } from "primeng/dataview";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { TagModule } from "primeng/tag";
import { RatingModule } from "primeng/rating";
import { DialogModule } from "primeng/dialog";

// Composants
import { AdminControlComponent } from "app/shared/admin-control/admin-control.component";
import { FormsModule } from "@angular/forms";

const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-view",
  templateUrl: "./product-view.component.html",
  styleUrls: ["./product-view.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    ButtonModule,
    CardModule,
    TagModule,
    RatingModule,
    DialogModule,
    AdminControlComponent,
    FormsModule,
  ],
})
export class ProductViewComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  // Signal pour les produits
  public readonly products = this.productsService.products;

  // État du dialogue
  public isDialogVisible = false;
  public isCreation = false;
  public editedProduct: Product = emptyProduct;

  ngOnInit() {
    this.productsService.get().subscribe();
  }
}
