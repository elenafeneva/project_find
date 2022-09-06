import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Students } from '../../../models/students';
import { Skills } from '../../../models/skills';
import { Users } from '../../../models/users';
import { Companies } from '../../../models/companies';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CompaniesService } from '../../../services/companies.service';
import { UsersService } from '../../../services/users.service';
import { Faculties } from '../../../models/faculties';
import { FacultiesService } from '../../../services/faculties.service';

@Component({
  selector: 'app-profile-signup',
  templateUrl: './profile-signup.component.html',
  styleUrls: ['./profile-signup.component.scss']
})
export class ProfileSignupComponent implements OnInit {

//DATA SERVICE
  datatansfer: any;
//STUDENT
	studentData: Students=new Students();
//SKILLS
	skillsData: Skills[]=[];
	selectedSkill: Skills=new Skills();
//USER
	userData: Users= new Users();
//COMPANY
	company: Companies = new Companies();
	//FACULTY
	faculty: Faculties = new Faculties();

  constructor(private dataService: DataService, 
			private router: Router,
			private facultiesService: FacultiesService,
			private translateService: TranslateService,
			private usersService: UsersService,
			private companyService: CompaniesService
			) { }

 async ngOnInit() {
	this.dataService.currentMessage.subscribe(message => this.datatansfer = message);
	if (this.datatansfer) {
		if (this.datatansfer.Token) { 
			if(this.datatansfer.Student){
				this.studentData = this.datatansfer.Student;
				await this.facultiesService.getFaculty(this.studentData.faculty_Id);
				this.faculty = this.facultiesService.facultyResp;
			}
			if(this.datatansfer.Skills){
				this.skillsData=this.datatansfer.Skills;
			}
			if(this.datatansfer.User){
				this.userData=this.datatansfer.User;
			}

		}
		else{
			this.router.navigate(['signup/user']);
		}
		if(this.userData?.role==2)
		{
			await this.companyService.getCompany(this.userData?.company_Id);
			if(this.companyService.CompanyResp!=null){
				this.company=this.companyService.CompanyResp;
			}

		}

	}
}

  //GO ON BACCK PAGE
  BackPage(){
    const Podatoci={
		User:this.userData, 
		Student:this.studentData,   
		Skills: this.skillsData,
		Token:true
	}
    this.dataService.changeMessage(Podatoci);
	if(this.datatansfer.User.role==2)
		this.router.navigate(['signup/user']);
	else if(this.datatansfer.User.role==3)
		this.router.navigate(['signup/skills']);
  }

  //SAVE NEW USER 
  async SaveNewUser(){
	await this.usersService.Signup(this.userData,this.studentData,this.skillsData);
	if(this.usersService.SaveUserSignUp){
		this.dataService.changeMessage(null);
		this.router.navigate(['login']);

	}
  }
}
