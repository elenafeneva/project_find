import {Component, OnInit} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {Users} from './models/users';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {

    model: any[];
    user: Users=new Users();

    constructor(public app: AppMainComponent,private translateService: TranslateService) {}

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.model = [];
        if(this.user.role==1){
            this.translateService.get('Companies').subscribe(value => {
             this.model = [
             {
                label: this.translateService.instant("Companies"), icon: 'pi pi-fw pi-star', routerLink: ['/pages/companies'],
                     items: [
                         { label: this.translateService.instant("Dashboard"), icon: 'pi pi-fw pi-chart-bar', routerLink: ['/pages/dashboard'] },
                    { label: this.translateService.instant("Companies"), icon: 'pi pi-fw pi-building', routerLink: ['/pages/companies'] },
                    { separator: true }
                ]
            }];});
        }
        else if(this.user.role==2){
            this.translateService.get('Companies').subscribe(value => {
             this.model = [
             {
                label: this.translateService.instant("Employees"), icon: 'pi pi-fw pi-star', routerLink: ['/pages/companyusers'],
                     items: [
                         { label: this.translateService.instant("Dashboard"), icon: 'pi pi-fw pi-chart-bar', routerLink: ['/pages/dashboard'] },
                    { label: this.translateService.instant("Employees"), icon: 'pi pi-fw pi-users', routerLink: ['/pages/companyusers'] },
                    { label: this.translateService.instant("Projects"), icon: 'pi pi-fw pi-th-large', routerLink: ['/pages/projects'] },
                    { separator: true }
                ]
            }];});
        }
        else if (this.user.role == 3) {
            this.translateService.get('Projects').subscribe(value => {
                this.model = [
                    {
                        items: [
                            { label: this.translateService.instant("Dashboard"), icon: 'pi pi-fw pi-chart-bar', routerLink: ['/pages/dashboard'] },
                            { label: this.translateService.instant("Projects"), icon: 'pi pi-fw pi-th-large', routerLink: ['/pages/projects'] },
                            { label: this.translateService.instant("ParticipatedProjects"), icon: 'pi pi-fw pi-th-large', routerLink: ['/pages/participatedprojects'] },
                            { separator: true }
                        ]
                    }];
            });
        }
        else{
            this.model=[];
        }
        //this.model = [
           // {
           //     label: 'Favorites', icon: 'pi pi-home',
           //     items: [
           //         {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/']}
           //     ]
           // },
           // {separator: true},
           // {
           //     label: 'UI Kit', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'],
           //     items: [
           //         {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout']},
           //         {label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input']},
           //         {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon'},
           //         {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},
           //         {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list']},
           //         {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree']},
           //         {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel']},
           //         {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay']},
           //         {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu']},
           //         {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message']},
           //         {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file']},
           //         {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts']},
           //         {label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc']}
           //     ]
           // },
           // {separator: true},
           // {
           //     label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['utilities'],
           //     items: [
           //         {label: 'Display', icon: 'pi pi-fw pi-desktop', routerLink: ['utilities/display']},
           //         {label: 'Elevation', icon: 'pi pi-fw pi-external-link', routerLink: ['utilities/elevation']},
           //         {label: 'FlexBox', icon: 'pi pi-fw pi-directions', routerLink: ['utilities/flexbox']},
           //         {label: 'Icons', icon: 'pi pi-fw pi-search', routerLink: ['utilities/icons']},
           //         {label: 'Text', icon: 'pi pi-fw pi-pencil', routerLink: ['utilities/text']},
           //         {label: 'Widgets', icon: 'pi pi-fw pi-star-o', routerLink: ['utilities/widgets']},
           //         {label: 'Grid System', icon: 'pi pi-fw pi-th-large', routerLink: ['utilities/grid']},
           //         {label: 'Spacing', icon: 'pi pi-fw pi-arrow-right', routerLink: ['utilities/spacing']},
           //         {label: 'Typography', icon: 'pi pi-fw pi-align-center', routerLink: ['utilities/typography']}
           //     ]
           // },
           // {separator: true},
           // {
           //     label: 'Pages', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages'],
           //     items: [
           //         {label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud']},
           //         {label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar']},
           //         {label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank'},
           //         {label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login']},
           //         {label: 'Invoice', icon: 'pi pi-fw pi-dollar', routerLink: ['/pages/invoice']},
           //         {label: 'Help', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/help']},
           //         {label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/error']},
           //         {label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/notfound']},
           //         {label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/access']},
           //         {label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty']}
           //     ]
           // },
           // {separator: true},
           // {
           //     label: 'Hierarchy', icon: 'pi pi-fw pi-align-left',
           //     items: [
           //         {
           //             label: 'Submenu 1', icon: 'pi pi-fw pi-align-left',
           //             items: [
           //                 {
           //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-align-left',
           //                     items: [
           //                         {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-align-left'},
           //                         {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-align-left'},
           //                         {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-align-left'},
           //                     ]
           //                 },
           //                 {
           //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-align-left',
           //                     items: [
           //                         {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-align-left'}
           //                     ]
           //                 },
           //             ]
           //         },
           //         {
           //             label: 'Submenu 2', icon: 'pi pi-fw pi-align-left',
           //             items: [
           //                 {
           //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-align-left',
           //                     items: [
           //                         {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-align-left'},
           //                         {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-align-left'},
           //                     ]
           //                 },
           //                 {
           //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-align-left',
           //                     items: [
           //                         {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-align-left'},
           //                     ]
           //                 },
           //             ]
           //         }
           //     ]
           // },
           // {separator: true},
           // {
           //     label: 'Start', icon: 'pi pi-fw pi-download',
           //     items: [
           //         {
           //             label: 'Buy Now', icon: 'pi pi-fw pi-shopping-cart', url: ['https://www.primefaces.org/store']
           //         },
           //         {
           //             label: 'Documentation', icon: 'pi pi-fw pi-info-circle', routerLink: ['/documentation']
           //         }
           //     ]
           // },
        //];
    }

    onMenuClick(event) {
        this.app.onMenuClick(event);
    }
}
