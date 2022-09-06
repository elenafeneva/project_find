import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentSignupComponent } from './pages/signup/student-signup/student-signup.component';
import { SkillSignupComponent } from './pages/signup/skill-signup/skill-signup.component';
import { ProfileSignupComponent } from './pages/signup/profile-signup/profile-signup.component';
import { UserSignupComponent } from './pages/signup/user-signup/user-signup.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { AuthGuard } from './auth.guard';
import { CompaniesComponent } from './pages/companies/companies.component';
import { ComapnyusersComponent } from './pages/comapnyusers/comapnyusers.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ParticipatedprojectsComponent } from './pages/participatedprojects/participatedprojects.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                canActivate: [AuthGuard],
                children: [
                    {path: '', component: AppLoginComponent},
                    {path: 'pages/companies', component: CompaniesComponent},
                    { path: 'pages/companyusers', component: ComapnyusersComponent },
                    { path: 'pages/projects', component: ProjectsComponent },
                    { path: 'pages/participatedprojects', component: ParticipatedprojectsComponent },
                    { path: 'pages/userprofile', component: ProfileComponent },
                    { path: 'pages/dashboard', component: DashboardComponent }

   
                ]
            },
            {path: 'signup', component: SignupComponent,
                children: [
                    { path: 'user', component: UserSignupComponent },
                    { path: 'student', component: StudentSignupComponent },
                    { path: 'skills', component: SkillSignupComponent },
                    { path: 'profile', component: ProfileSignupComponent }]
            },
            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: 'changepassword', component: ChangepasswordComponent},
            {path: '**', redirectTo: '/notfound'},
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
