import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "app/services/auth.service";

@Injectable({
  providedIn: "root",
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Vérifier si l'utilisateur est connecté
    const userLoggedIn = this.authService.isLogged;
    console.log("Valeur connexion via guard:", userLoggedIn);

    if (!userLoggedIn) {
      // L'utilisateur n'est pas connecté, on le redirige vers la page de login
      this.router.navigate(["/login"]);
      return false;
    }

    return true;
  }
}
