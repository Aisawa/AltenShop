import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly _isAdmin = new BehaviorSubject<boolean>(false);
  public readonly isAdmin$ = this._isAdmin.asObservable();
  isLogged: boolean = false;
  redirect: string | null = null;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.redirect = params.get("redirect");
        console.log("Redirect:", this.redirect);
      },
    });
  }

  setLogged() {
    this.isLogged = !this.isLogged;
    if (this.isLogged && this.redirect) {
      this.router.navigate(["/" + this.redirect]);
    }
  }

  // On obtient la valeur actuelle de isAdmin
  public get isAdmin(): boolean {
    return this._isAdmin.value;
  }

  // On utilise pour la démo de l'application, dans une vraie app on utilise une authentification réelle
  public setAdminStatus(isAdmin: boolean): void {
    this._isAdmin.next(isAdmin);
  }

  // Vérifier si l'utilisateur peut modifier les produits
  public canEditProducts(): boolean {
    return this.isAdmin;
  }

  // Vérifier si l'utilisateur peut supprimer les produits
  public canDeleteProducts(): boolean {
    return this.isAdmin;
  }
}
