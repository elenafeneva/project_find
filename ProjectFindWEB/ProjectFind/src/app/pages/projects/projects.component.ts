import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Projects } from '../../models/projects';
import { Skills } from '../../models/skills';
import { Users } from '../../models/users';
import { SkillsService } from '../../services/skills.service';
import { ProjectsService } from '../../services/projects.service';
import { StudentsService } from '../../services/students.service';
import { Students } from '../../models/students';
import { ImagesService } from '../../services/images.service';
import { Faculties } from '../../models/faculties';
import { FacultiesService } from '../../services/faculties.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [MessageService]
})
export class ProjectsComponent implements OnInit {

    //BOOLEAN VARIABLES 
    projectDialog: boolean = false;
    displayMaximizable: boolean = false;

    //PROJECT
    project: Projects = new Projects();
    projects: Projects[] = [];
    projectName: string;
    applyDescription: string;

    //Data View
    sortOrder: number;
    sortField: string;

    //SKILLS
    skillsList: Skills[] = [];
    selectedSkills: Skills[] = [];
    selectedSkillsFilter: Skills[] = [];
    projectSkills: Skills[] = [];
    skillsStudent: Skills[] = [];
    skill: Skills = new Skills();

    //STUDENTS
    students: Students[] = [];
    selectedStudents: Students[] = [];
    student: Students = new Students();
    selectedStudent: Students = new Students();
    degrees: any;
    selectedDegree: any;

    //USER 
    user: Users = new Users();
    projectUser: Users = new Users();

    //BOOLEAN
    showButton: boolean = false;
    dialogParticipate: boolean = false;
    studentOrEmployee: boolean = false; //False Employee, true-Student
    updateOrSaveProject: boolean = false; //False Save, True - Update;

    //DATE 
    date: Date;

    //COMPANY
    companyImage: string;

    //FACULTY 
    faculty: Faculties = new Faculties();
    faculties: Faculties[] = [];

    constructor(private translateService: TranslateService,
        private skillService: SkillsService,
        private facultiesService: FacultiesService,
        private studentService: StudentsService,
        private projectService: ProjectsService,
        private imageService: ImagesService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        this.degrees = [{ name: this.translateService.instant('Diplomski'), value: 1 },
        { name: this.translateService.instant('Magisterski'), value: 2 },
            { name: this.translateService.instant('Doktorski'), value: 3 }];

        this.user = JSON.parse(localStorage.getItem("currentUser"));
        if (this.user.role == 2) {
            this.showButton = true;
            this.studentOrEmployee = false;
        }
        else if (this.user.role == 3) {
            this.showButton = false;
            this.studentOrEmployee = true;
        }
        else {
            this.showButton = false;
            this.studentOrEmployee = false;
        }
        this.getProjects();
        this.getSkills();
        this.getFaculties();
  }

    //FACULTIES
    async getFaculties() {
        await this.facultiesService.getFaculties();
        this.faculties = this.facultiesService.facultiesResp;
    }

  //OPEN DIALOG FOR PROJECT
    async openDialogToCreateproject() {
        this.project = new Projects();
        this.selectedSkills = [];
        this.students = [];
        this.updateOrSaveProject = false;
        this.displayMaximizable = true;
        this.projectName = this.translateService.instant('NewProject');
        this.projectUser = this.user;
        await this.imageService.getImageCompany(this.projectUser.company_Id);
        this.companyImage = this.imageService.imageCompanyResp;
        await this.getSkills();
        this.projectDialog = true;
    }

    //SHOW PROJECT DIALOG FOR STUDENTS 
    async showProjectDialog(project: any) {
        this.project = project;
        this.projectName = this.project.name;
        await this.projectService.getProjectWithSkillsAndUser(this.project.id);
        this.projectUser = this.projectService.userResp;
        await this.imageService.getImageCompany(this.projectUser.company_Id);
        this.companyImage = this.imageService.imageCompanyResp;
        if (this.projectUser.role != 3)
            this.updateOrSaveProject = true;
        this.projectSkills = this.projectService.skillsResp;
        //TAKE STUDENT SKILLS
        if (this.studentOrEmployee) {
            await this.skillService.getStudentSkillsForProject(this.user.student_Id);
            this.skillsStudent = this.skillService.skillsStudentResp;
        }
        else {
            await this.skillService.getSkillsForProject(this.project.id);
            this.selectedSkills = this.skillService.selectedSkillsResp;
            await this.studentService.getParticipatedStudents(this.project.id);
            this.students = this.studentService.projectStudentsParticipate;
        }
        this.displayMaximizable = true;
    }

  //GET Skills
  async getSkills() {
        await this.skillService.getSkills();
        if (this.skillService.SkillsResp != null) {
            this.skillsList = this.skillService.SkillsResp;
        }
  }

  //SAVE PROJECT 
    async SaveProject() {
        await this.projectService.saveProject(this.project, this.selectedSkills);
        if (this.projectService.saveProjectResp == true) { 
            this.messageService.add({ key: 'tc', severity: 'success', summary: this.translateService.instant('Success'), life: 3000 });
            this.displayMaximizable = false;
            this.project = new Projects();
            this.selectedSkills = [];
            await this.getProjects();
        }
        else
            this.messageService.add({ key: 'tc', severity: 'error', summary: this.translateService.instant('Warn'), life: 3000 });
    }

  //ADD SKILL
    async AddNewSkill() {
        await this.skillService.saveSkills(this.skill);
        if (this.skillService.SaveSkills == true) {
            await this.skillService.getSkills();
            this.skillsList = this.skillService.SkillsResp;
            this.skill = new Skills();
            this.messageService.add({ key: 'tc', severity: 'success', summary: this.translateService.instant('Success'), life: 3000 });
        }
        else { this.messageService.add({ key: 'tc', severity: 'error', summary: this.translateService.instant('Warn'), life: 3000 }); }
    }

    //GET PROJECT
    async getProjects() {
        await this.projectService.getProjects();
        if (this.projectService.projectsResp != null) {
            this.projects = this.projectService.projectsResp;
        }
        else
            this.projects = [];
    }

    //GET PROJECTS BY SKILLS
    async searchProjectBySkills() {
        if (this.selectedSkillsFilter.length > 0) {
            await this.projectService.getProjectsBySkills(this.selectedSkillsFilter);
            if (this.projectService.projectsResp != null) {
                this.projects = this.projectService.projectsResp;
            }
            else {
                this.projects = [];
            }
        }
        else {
            this.getProjects();
        }

    }

    //PARTICIPATE ON PROJECT
    async studentParticipate() {
        await this.studentService.studentParticipation(this.user, this.project.id, this.applyDescription);
        if (this.studentService.studentParticipationResp == true) {
            this.messageService.add({ key: 'tc', severity: 'success', summary: this.translateService.instant('Success'), life: 3000 });
            this.dialogParticipate = false;
            this.applyDescription = '';
            await this.getProjects();
        }
        else {
            this.messageService.add({ key: 'tc', severity: 'error', summary: this.translateService.instant('Warn'), life: 3000 });
        }
    }
    openDialogParticipate(project: Projects) {
        this.project = project;
        this.dialogParticipate = true;
    }

    //SHOW PARTICIPATED STUDENT
    async selectedRowStudent(student:any) {
        this.selectedStudent = student;
        if (this.selectedStudents.length == 1) {
            await this.facultiesService.getFaculty(this.selectedStudent.faculty_Id);
            this.faculty = this.facultiesService.facultyResp;
        }
        this.faculty = new Faculties();
        await this.skillService.getStudentSkillsForProject(this.selectedStudent.id);
        this.skillsStudent = this.skillService.skillsStudentResp;
        this.date = new Date(this.selectedStudent.startDateFax);
        this.selectedDegree = this.degrees.find(x => x.value == this.selectedStudent.degree);
    }

    //UNSELECTED ROW
    onRowUnselect(event: any) {
        this.selectedStudent = new Students();
        this.faculty = new Faculties();
        this.date = null;
        this.selectedDegree = null;
        this.skillsStudent = null;
    }

    //SEND MAIL TO USERS AND CLOSE THE PROJECT
    async SendMailAndCloseProject() {
        await this.projectService.SendMailAndCloseProject(this.selectedStudents, this.project);
        if (this.projectService.closedProject == true)
            this.displayMaximizable = false;
    }
}
