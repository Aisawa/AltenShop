import { Injectable, inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class ProductEditGuard {
  private authService = inject(AuthService);

  canEdit(): boolean {
    return this.authService.canEditProducts();
  }
}
