import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { SkillsService } from '../../../services/skills.service';
import { TranslateService } from '@ngx-translate/core';
import { Skills } from '../../../models/skills';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-skill-signup',
  templateUrl: './skill-signup.component.html',
  styleUrls: ['./skill-signup.component.scss'],
  providers: [MessageService]
})
export class SkillSignupComponent implements OnInit {

//DATA SERVICE
  datatansfer: any;
//SKILLS
  selectedSkills: Skills[]=[];
  skills: Skills[]=[];
  skill: Skills=new Skills();
  constructor(private dataService: DataService, 
			  private router: Router,
			  private skillService: SkillsService, 
			  private messageService: MessageService,
			  private translateService: TranslateService) { }

  ngOnInit(): void {
	this.dataService.currentMessage.subscribe(message => this.datatansfer = message);
	   if (this.datatansfer) {
            if (this.datatansfer.Token) {
                if (this.datatansfer.Skills){
					this.selectedSkills=this.datatansfer.Skills;
				}
			}
			else{
				this.router.navigate(['signup/user']);
			}
		}
		this.getSkills();
  }

  //GET Skills
  async getSkills(){
		await this.skillService.getSkills();
		if(this.skillService.SkillsResp!=null){
			this.skills = this.skillService.SkillsResp;
		}
  }

  async AddNewSkill(){
		await this.skillService.saveSkills(this.skill);
		if(this.skillService.SaveSkills==true)
			{	
				await this.skillService.getSkills(); 
				this.skills = this.skillService.SkillsResp;
				this.skill = new Skills();
				this.messageService.add({ key: 'tc', severity: 'success', summary: this.translateService.instant('Success'), life: 3000 });
			}
		else
			{this.messageService.add({ key: 'tc', severity: 'error', summary: this.translateService.instant('Warn'), life: 3000 });}
  }

  //NEXT PAGE
  NextPage(){
      const Podatoci={
		User:this.datatansfer.User, 
		Student:this.datatansfer.Student,   
		Skills: this.selectedSkills,
		Token:true
	}
    this.dataService.changeMessage(Podatoci);
	this.router.navigate(['signup/profile']);
  }

  //BACK PAGE
  BackPage(){
        const Podatoci={
			Student:this.datatansfer.Student,
			Skills: this.selectedSkills,
			User:this.datatansfer.User,
			Token:true
		}
    this.dataService.changeMessage(Podatoci);
	this.router.navigate(['signup/student']);
  }


}
