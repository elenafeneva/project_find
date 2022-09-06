import {Component, OnDestroy} from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { BreadcrumbService } from './app.breadcrumb.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Users } from './models/users';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UsersService } from './services/users.service';
import { AppComponent } from './app.component';


@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnDestroy{

    subscription: Subscription;

    items: MenuItem[];
    user: Users=new Users();


    constructor(public breadcrumbService: BreadcrumbService,
        private router: Router,
        public app: AppComponent,
        private userService: UsersService,
        private translateService: TranslateService,
        public appMain: AppMainComponent) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        },
            this.user = JSON.parse(localStorage.getItem('currentUser'))
    );
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    //LOGOUT USER
    Logout(){
        this.userService.Logout();
        this.router.navigate(['login']);
    }

}
