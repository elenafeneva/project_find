import { Degree } from '../enums/degree.enum';

export class Students {
	id: number;
	username: string;
	startDateFax: Date;
	faculty_Id: number;
	academy: boolean;
	academyName: string;
	gradeLevel:number;
	degree: Degree;
	studentEmail: string;
	skill_Id: number;
	biography: string;
	consttructor(
		id?: number,
		username?: string,
		startDateFax?: Date,
		faculty_Id?:number,
		academy?: boolean,
		academyName?: string,
		gradeLevel?:number,
	    degree?: Degree,
		studentEmail?: string,
		skill_Id?: number,
		biography?: string
	){
		this.id=id;
		this.username=username;
		this.startDateFax = startDateFax;
		this.faculty_Id = faculty_Id;
		this.academy = academy;
		this.academyName = academyName;
		this.gradeLevel=gradeLevel;
		this.degree=degree;
		this.studentEmail=studentEmail;
		this.skill_Id=skill_Id;
		this.biography=biography;
	}
}
