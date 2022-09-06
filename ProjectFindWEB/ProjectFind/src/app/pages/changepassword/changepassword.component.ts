import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../app/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { Language } from '../../../app/models/language';
import { Finddata } from '../../../app/models/helpers/finddata';
import { Users } from '../../../app/models/users';
import { UsersService } from '../../../app/services/users.service';
import {MessageService} from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],
  providers: [MessageService]
})
export class ChangepasswordComponent implements OnInit {

	//VARIABLES
	email:string;
	password:string;
	newPassword:string;

    //LANGUAGE
	languages: Language[]=[];
	language: Language=new Language();

    //FINDDATA
    findData: Finddata = new Finddata();

    //USERS 
    user: Users=new Users();

  constructor(private translateService: TranslateService,
				private languageService: LanguageService,
                private messageService: MessageService,
                private router: Router,
                private userService: UsersService) { }

  ngOnInit(): void {
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

  //setPassword NEW PASSWORD
  async setPassword(){
    this.findData.newPassword=this.newPassword;
    this.findData.password = this.password;
    this.user.email=this.email;
    await this.userService.SetNewPassword(this.user,this.findData);
    if(this.userService.changedPassword==true){
		this.router.navigate(['login']);
	}
	else{
		this.messageService.add({ key: 'tc', severity: 'error', summary: this.translateService.instant('ErrorPassword'), life: 3000 });
	}
  }

}
