import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { CanComponentDeactivate } from "app/guards/can-component-deactivate.guard";
import { AuthService } from "app/services/auth.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements CanComponentDeactivate {
  constructor(private authService: AuthService) {}

  estConnecte: boolean = false;

  // Se connecter via le service
  seConnecter(): void {
    this.authService.setLogged();
    this.estConnecte = this.authService.isLogged;
  }

  // Se déconnecter via le service
  seDeconnecter(): void {
    this.authService.setLogged();
    this.estConnecte = this.authService.isLogged;
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.estConnecte)
      return confirm("Voulez-vous vraiment quitter cette page ?");

    return true;
  }
}
