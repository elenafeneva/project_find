import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Companies } from '../../models/companies';
import { Faculties } from '../../models/faculties';
import { Globals } from '../../models/globals';
import { Skills } from '../../models/skills';
import { Students } from '../../models/students';
import { Users } from '../../models/users';
import { CompaniesService } from '../../services/companies.service';
import { FacultiesService } from '../../services/faculties.service';
import { ImagesService } from '../../services/images.service'
import { SkillsService } from '../../services/skills.service';
import { StudentsService } from '../../services/students.service';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {

    //IMAAGE UPLOAD AND DOWNLOAD
    importURL: string;
    image: any;

    //USER 
    user: Users = new Users();

    //COMPANY 
    company: Companies = new Companies();

    //STUDENT
    student: Students = new Students();

    //DEGREE 
    degrees: any[] = [];
    selectedDegree: any;

    //IMAGE 
    companyImage: string;

    //FACULTY
    faculty: Faculties = new Faculties();

    //SKILLS
    skillsData: Skills[] = [];
    selectedSkills: Skills[] = [];
    skills: Skills[] = [];
    skill: Skills = new Skills();
    dialogSkills: boolean = false;

    constructor(public global: Globals,
        private translateService: TranslateService,
        private companiesService: CompaniesService,
        private skillsService: SkillsService,
        private studentsService: StudentsService,
        private facultiesService: FacultiesService,
        private usersService: UsersService,
        private messageService: MessageService,
        private imagesService: ImagesService) { }

    async ngOnInit(): Promise<void> {
        this.user = JSON.parse(localStorage.getItem("currentUser"));
        this.translateService.get('Diplomski').subscribe(value => {
            this.degrees = [{ name: this.translateService.instant('Diplomski'), value: 1 },
            { name: this.translateService.instant('Magisterski'), value: 2 },
            { name: this.translateService.instant('Doktorski'), value: 3 }];
        });
        await this.imagesService.getImage(this.user.id);
        if (this.imagesService.imageResp!=null)
            this.image = this.imagesService.imageResp;
        if (this.user.company_Id) {
            await this.imagesService.getImageCompany(this.user.company_Id);
            this.companyImage = this.imagesService.imageCompanyResp;
        }
        this.importURL = this.global.ApiURL + "/files/imageset?token=" + this.user.id;
        if (this.user.company_Id) {
            await this.companiesService.getCompany(this.user.company_Id);
            this.company = this.companiesService.CompanyResp;
        }
        if (this.user.student_Id) {
            await this.studentsService.getStudent(this.user.student_Id);
            this.student = this.studentsService.studentResp;
            this.student.startDateFax = new Date(this.student.startDateFax);
            this.selectedDegree = this.degrees.find(x => x.value == this.student.degree);
            await this.facultiesService.getFaculty(this.student.faculty_Id);
            this.faculty = this.facultiesService.facultyResp;
            this.getStudentSkills();
        }
    }

    async UpdateUser() {
        if (this.user.student_Id) {
            await this.studentsService.updateStudent(this.user, this.student);
            if (this.studentsService.updateStudentResp == true) {
                localStorage.removeItem("currentUser");
                await localStorage.setItem('currentUser', JSON.stringify(this.user));
                this.messageService.add({ key: 'tc', severity: 'success', summary: this.translateService.instant('SaveSucceded'), life: 3000 });
            }
            else
                this.messageService.add({ key: 'tc', severity: 'error', summary: this.translateService.instant('SaveError'), life: 3000 });
        }
        else {
            await this.usersService.updateUser(this.user);
            if (this.usersService.updateUserResp == true) {
                localStorage.removeItem("currentUser");
                await localStorage.setItem('currentUser', JSON.stringify(this.user)); 
                this.messageService.add({ key: 'tc', severity: 'success', summary: this.translateService.instant('SaveSucceded'), life: 3000 });
            }
            else
                this.messageService.add({ key: 'tc', severity: 'error', summary: this.translateService.instant('SaveError'), life: 3000 });
        }
    }

    //IMAGE 
    async getImage() {
        await this.imagesService.getImage(this.user.id);
        if (this.imagesService.imageResp != null)
            this.image = this.imagesService.imageResp;
        else
            this.image = null;
    }

    //GET STUDENT SKILLS 
    async getStudentSkills() {
        await this.skillsService.getStudentSkillsForProject(this.user.student_Id);
        this.skillsData = this.skillsService.skillsStudentResp;
    }

    async openDialogSkills() {
        await this.getSkills();
        this.dialogSkills = true;
    }

    //GET Skills
    async getSkills() {
        await this.skillsService.getSkills();
        if (this.skillsService.SkillsResp != null) {
            this.skills = this.skillsService.SkillsResp;
        }
    }

    //SAVE STUDENTSKILLS
    async saveSkills() {
        await this.skillsService.saveStudentSkills(this.selectedSkills, this.user.student_Id);
        if (this.skillsService.SaveManySkills) {
            this.dialogSkills = false;
            this.selectedSkills = [];
            this.getStudentSkills();
        }
    }

    async AddNewSkill() {
        await this.skillsService.saveSkills(this.skill);
        if (this.skillsService.SaveSkills == true) {
            this.skills = this.skillsService.SkillsResp;
            this.skill = new Skills();
            this.getSkills();
            this.messageService.add({ key: 'tc', severity: 'success', summary: this.translateService.instant('Success'), life: 3000 });
        }
        else { this.messageService.add({ key: 'tc', severity: 'error', summary: this.translateService.instant('Warn'), life: 3000 }); }
    }

}
