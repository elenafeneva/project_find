import { Component, OnInit } from '@angular/core';
import { MenuItem } from "primeng/api";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
 
//STEPS
    items: MenuItem[] = [];
    activeIndex: number = 0;

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
     this.items = [
     {
            label: this.translateService.instant('User'),
            command: (event: any) => {
                this.activeIndex = 0;
            },
            routerLink: 'user'
        },
     {
            label: this.translateService.instant('Student'),
            command: (event: any) => {
                this.activeIndex = 1;
            },
            routerLink: 'student'
        },
        {
            label: this.translateService.instant('Skils'),
            command: (event: any) => {
                this.activeIndex = 2;
            },
            routerLink: 'skills'
        },
        {
            label: this.translateService.instant('Profile'),

            command: (event: any) => {
                this.activeIndex = 3;
            },
            routerLink: 'profile'
        }
        ];
  }

}
