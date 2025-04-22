import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShiftService } from '../services/shift.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftGuard implements CanActivate {
  constructor(private shiftService: ShiftService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isActiveShift = this.shiftService.getShiftState();
    const isAccessingActiveShift = state.url.includes('active-shift');

    if (isAccessingActiveShift && !isActiveShift) {
      this.router.navigate(['/app'])
      return false
    }

    if (!isAccessingActiveShift && isActiveShift) {
      this.router.navigate(['/active-shift'])
      return false
    }

    return true;
  }
}
