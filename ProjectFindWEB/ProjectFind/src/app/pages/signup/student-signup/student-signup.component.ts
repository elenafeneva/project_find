import { Component, OnInit } from '@angular/core';
import { Students } from '../../../models/students';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Skills } from '../../../models/skills';
import { Faculties } from '../../../models/faculties';
import { DataService } from '../../../services/data.service';
import { FacultiesService } from '../../../services/faculties.service';

@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.scss']
})
export class StudentSignupComponent implements OnInit {
	//STUDENT 
	student: Students = new Students();

	//DEGREE
	degrees: any[]=[];
	selectedDegree: any;

	//DATA FROM SERVICE
	resp: any;

	//SKILLS
	selectedSkills: Skills[] = [];

	//AUTOCOMPLETE 
	autoCompleteFaculty: any;
	autoCompleteFacultySuggestions: Faculties[] = [];
	dialogSaveFaculty: boolean = false;
	faculty: Faculties = new Faculties();

	constructor(private translateService: TranslateService,
		private router: Router,
		private dataService: DataService,
		private facultiesService: FacultiesService	) { }

  ngOnInit(): void {
  	this.degrees =[{name:this.translateService.instant('Diplomski'), value:1},
					{name:this.translateService.instant('Magisterski'), value:2},
					{name:this.translateService.instant('Doktorski'), value:3}];
	this.selectedDegree = {name:this.translateService.instant('Diplomski'), value:1};

    this.dataService.currentMessage.subscribe(message => this.resp = message);
        if (this.resp) {
            if (this.resp.Token) {
                if (this.resp.Student){
					this.student = this.resp.Student;
					this.selectedDegree=this.degrees.find(x=>x.value==this.student.degree)
				}
			}
			else{
				this.router.navigate(['signup/user']);
			}
		}
  }

  //CHANGE DEGREE
  changeDegree(){
	this.student.degree = this.selectedDegree.value;
  }

 //FACULTY 
	async listFaculties($event) {
		if ($event.keyCode === 13) {
			await this.facultiesService.getAutoCompleteFaculties(this.autoCompleteFaculty);
			this.autoCompleteFacultySuggestions = this.facultiesService.listFaculties;
		}
	}

	async filtredFaculties($event) {
		await this.facultiesService.getAutoCompleteFaculties(this.autoCompleteFaculty);
		this.autoCompleteFacultySuggestions = this.facultiesService.listFaculties;
	}

  //GO ON NEXT PAGE
  NextPage(){
	  this.student.degree = this.selectedDegree.value;
	  this.student.faculty_Id = this.autoCompleteFaculty?.id;
	  const Podatoci={
	    User: this.resp.User,  
		Student: this.student,
		Skills:this.resp.Skills,
		Token:true
	  }
	  this.dataService.changeMessage(Podatoci);
	  this.router.navigate(['signup/skills']);
  }

    //BACK PAGE
  BackPage(){
        const Podatoci={
			User:this.resp.User,
			Student:this.resp.Student,
			Skills: this.selectedSkills,
			Token:true
		}
    this.dataService.changeMessage(Podatoci);
	this.router.navigate(['signup/user']);
  }

	//DIALOG SAVE FACULTY 
	openDialogSaveFaculty() {
		this.dialogSaveFaculty = true;
		this.faculty = new Faculties();
    }

	//SAVE FACULTY
	async saveFaculty() {
		await this.facultiesService.saveFaculty(this.faculty);
		if (this.facultiesService.SaveFaculty == true) {
			this.dialogSaveFaculty = false;
        }
    }
}
