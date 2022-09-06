import { Component } from '@angular/core';
import { Users } from '../../app/models/users';
import { Language } from '../../app/models/language';
import { UsersService } from '../../app/services/users.service';
import { LanguageService } from '../../app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import {Message, MessageService} from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  providers: [MessageService]
})
export class AppLoginComponent {
	//USER
	user: Users=new Users();
	
	//LANGUAGE
	languages: Language[]=[];
	language: Language=new Language();

	//MESAAGE
	msgs: Message[];

	//BOOLEAN 
	passwordDialog: boolean=false;

	email:string;

	  constructor( private usersService: UsersService,
				private translateService: TranslateService,
				private languageService: LanguageService,
				private messageService: MessageService,
				private router: Router
	  ) {}

	ngOnInit() {
	      this.languageService.getLanguages().then(languages => {
            this.languages = languages;
            this.initTranslate();
        })
	}

	//INIT TRANSLATE 
    initTranslate() {
        let tmpLang = localStorage.getItem("lang");
        if (tmpLang === null) {
            localStorage.setItem("lang", "mk");
            tmpLang = "mk";
        }
        this.language.code = tmpLang;
        this.language.name = this.languages.filter(item => item.code === tmpLang)[0]?.name;
        this.translateService.use(tmpLang.toLowerCase());
		}

	//LOG IN USER
	async Login(){
		this.msgs = [];
		await this.usersService.Login(this.user);
		if(this.usersService.UserResp.id!='0'){
			//NAVIGATE
			await localStorage.setItem('currentUser',JSON.stringify(this.usersService.UserResp));
			if(this.usersService.UserResp.role == 1)
                    this.router.navigate(['pages/companies']);
			if(this.usersService.UserResp.role == 2)
				this.router.navigate(['pages/companyusers']);
			if (this.usersService.UserResp.role == 3)
				this.router.navigate(['pages/projects']);
		}
		else{
		this.msgs = [{ severity: 'error', summary: this.translateService.instant('ErrorPassword/Username') }];
		}
	}

	//SHOW DIALOG FORGOT PASSWORD
	showDialogFP(){
		this.passwordDialog=true;
	}

	//CREATE PROFILE
	CreateProfile(){
		this.router.navigate(['signup/student']);
	}

	//CHANGE LANGUAGE
	changeLanguage(){
		localStorage.setItem("lang", this.language.code);
		this.translateService.use(this.language.code.toLowerCase());

	}

	//RESET
	async resetPassword(){
		this.user= new Users();
		this.user.email= this.email;
		await this.usersService.ResetPassword(this.user);
		if(this.usersService.SentEmail==true){
			this.messageService.add({ key: 'tc', severity: 'success', summary: this.translateService.instant('EmailSent'), life: 3000 });
		}
		else{
			this.messageService.add({ key: 'tc', severity: 'error', summary: this.translateService.instant('ErrorEmail'), life: 3000 });
			}
	}
  }
