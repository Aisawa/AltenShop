import { Component, OnInit, inject, signal } from "@angular/core";
import { ProductDeleteGuard } from "app/guards/product-delete.guard";
import { ProductEditGuard } from "app/guards/product-edit.guard";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import { AuthService } from "app/services/auth.service";
import { AdminControlComponent } from "app/shared/admin-control/admin-control.component";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";

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
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [
    DataViewModule,
    CardModule,
    ButtonModule,
    DialogModule,
    ProductFormComponent,
    AdminControlComponent,
  ],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  private readonly editGuard = inject(ProductEditGuard);
  private readonly deleteGuard = inject(ProductDeleteGuard);
  public readonly authService = inject(AuthService);

  public readonly products = this.productsService.products;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  ngOnInit() {
    this.productsService.get().subscribe();
  }

  public onCreate() {
    if (this.editGuard.canEdit()) {
      this.isCreation = true;
      this.isDialogVisible = true;
      this.editedProduct.set(emptyProduct);
    }
  }

  public onUpdate(product: Product) {
    if (this.editGuard.canEdit()) {
      this.isCreation = false;
      this.isDialogVisible = true;
      this.editedProduct.set(product);
    }
  }

  public onDelete(product: Product) {
    if (this.deleteGuard.canDelete()) {
      this.productsService.delete(product.id).subscribe();
    }
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onCancel() {
    this.closeDialog();
  }

  public canEdit(): boolean {
    return this.editGuard.canEdit();
  }

  public canDelete(): boolean {
    return this.deleteGuard.canDelete();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }
}
