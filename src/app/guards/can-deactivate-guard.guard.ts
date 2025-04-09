import { CanDeactivate } from "@angular/router";
import { CanComponentDeactivate } from "./can-component-deactivate.guard";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CanDeactivateGuard
  implements CanDeactivate<CanComponentDeactivate>
{
  canDeactivate(
    component: CanComponentDeactivate
  ): boolean | Observable<boolean> | Promise<boolean> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
