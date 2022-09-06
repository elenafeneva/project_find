import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users';
import { UsersService } from '../../services/users.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Guid } from "guid-typescript";
import { ImagesService } from '../../services/images.service';
import { Companies } from '../../models/companies';
import { CompaniesService } from '../../services/companies.service';


@Component({
  selector: 'app-comapnyusers',
  templateUrl: './comapnyusers.component.html',
  styleUrls: ['./comapnyusers.component.scss'],
  providers: [MessageService]
})
export class ComapnyusersComponent implements OnInit {

	//COMPANY USERS
	companyUsers: Users[] = [];
	user: Users = new Users();
	userDialog: boolean = false;
	deleteUserDialog: boolean = false;

	//COMPANY 
	company: Companies = new Companies();

	constructor(private usersService: UsersService,
		private messageService: MessageService,
		private imagesService: ImagesService,
		private companiesService: CompaniesService,
		private translateService: TranslateService) { }

	ngOnInit(): void {
		this.getCompanyUsers();
  }

  async getCompanyUsers(){
	  await this.usersService.getCompanyUsers();
	  this.companyUsers = this.usersService.CompanyUsers;
  }

	async deleteComapnyUser() {
		await this.usersService.deleteUser(this.user);
		if (this.usersService.deleteUserResp == true) {
			this.getCompanyUsers();
			this.messageService.add({ key: 'tc', severity: 'success', summary: this.translateService.instant('SuccessDelete'), life: 3000 });
		}
		else
		{ this.messageService.add({ key: 'tc', severity: 'error', summary: this.translateService.instant('WarnDelete'), life: 3000 }); }

	}

	async saveCompanyUser() {
		await this.usersService.saveCompanyUser(this.user);
		if (this.usersService.SaveOneCompanyUser == true) {
			this.userDialog = false;
			this.getCompanyUsers();
			this.messageService.add({ key: 'tc', severity: 'success', summary: this.translateService.instant('Success'), life: 3000 });
		}
		else { this.messageService.add({ key: 'tc', severity: 'error', summary: this.translateService.instant('Warn'), life: 3000 }); }
    }

	async openDialogUser(user: Users) {
		await this.imagesService.getImage(user.id);
		if (this.imagesService.imageResp != null)
			user.image = this.imagesService.imageResp;
		this.user = user;
		await this.companiesService.getCompany(this.user.company_Id);
		this.company = this.companiesService.CompanyResp;
		this.deleteUserDialog = true;
		this.userDialog = true;
    }

	async openDialogSaveUser() {
		const companyUser = JSON.parse(localStorage.getItem('currentUser'));
		this.user = new Users();
		this.user.company_Id = companyUser?.company_Id;
		await this.companiesService.getCompany(this.user.company_Id);
		this.company = this.companiesService.CompanyResp;
		this.user.active = true;
		this.user.password = this.guidGenerate();
		this.deleteUserDialog = false;
		this.userDialog = true;
	}

	//GENERATE GUID
	guidGenerate() {
		return Guid.create().toString();
	}
}
