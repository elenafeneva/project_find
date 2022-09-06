import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router,RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from './services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

//VARIABLES
  tmpLang: string;
    urd: any = [{ role: 1, url: "/pages/companies" },
              { role: 1, url: "/pages/dashboard" },
              { role: 2, url: "/pages/companyusers" },
              { role: 2, url: "/pages/projects" },
              { role: 2, url: "/pages/userprofile" },
              { role: 2, url: "/pages/dashboard" },
              { role: 3, url: "/pages/projects" },
              { role: 3, url: "/pages/userprofile" },
              { role: 3, url: "/pages/dashboard" },
              { role: 3, url: "/pages/participatedprojects"} ];

  constructor(private translateService: TranslateService,
              private usersService: UsersService,
              private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.tmpLang = localStorage.getItem("lang");
    this.translateService.use(this.tmpLang?.toLowerCase());
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      // logged in so return true
        let url: string = state.url;
        if (state.url == "/" || state.url == "/login") {
            localStorage.removeItem("currentUser");
            this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        }
        return this.checkUserLogin(next, url);
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    return false;
    }

    checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
        if (this.usersService.isLoggedIn()) {

            if (this.ums(url)) {
                return true;
            }
            {
                this.router.navigate(['login'], { queryParams: { returnUrl: url } });
                return false;
            }
        }
        else {
            this.router.navigate(['/#/login']);
            return false;
        }
    }

    
    ums(url: any): boolean {
        const userRole = this.usersService.getRole();
        const postoi: any = this.urd.find(i => i.role === userRole && i.url === url)
        if (postoi) return true; else return false;
    }

  
}
