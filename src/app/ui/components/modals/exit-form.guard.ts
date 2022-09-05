import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ModalsService} from './modals.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExitFormGuard implements CanDeactivate<any> {

  constructor(private modalsService: ModalsService) {}

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot):
    Observable<boolean | UrlTree> | boolean {

    if (component.form?.dirty) {
      return this.modalsService.openConfirmModal().afterClosed().pipe(map((result: string) => {
        return result === 'exit';
      }, (error: any) => {
        return true;
      }));
    }
    return true;
  }
}
