import { Injectable, inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class ProductDeleteGuard {
  private authService = inject(AuthService);

  canDelete(): boolean {
    return this.authService.canDeleteProducts();
  }
}
