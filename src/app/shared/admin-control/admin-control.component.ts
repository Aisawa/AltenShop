import { Component, inject, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { ToggleButtonModule } from "primeng/togglebutton";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-admin-control",
  templateUrl: "./admin-control.component.html",
  styleUrls: ["./admin-control.component.scss"],
  standalone: true,
  imports: [CommonModule, ButtonModule, ToggleButtonModule, FormsModule],
})
export class AdminControlComponent implements OnInit {
  private authService = inject(AuthService);
  public isAdmin = false;

  ngOnInit() {
    // Initialiser l'état depuis AuthService
    this.isAdmin = this.authService.isAdmin;
  }

  toggleAdminStatus() {
    this.authService.setAdminStatus(this.isAdmin);
  }
}
