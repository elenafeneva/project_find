import { Injectable } from '@angular/core';
import { Users } from '../../app/models/users';
import { Skills } from '../../app/models/skills';
import { Finddata } from '../../app/models/helpers/finddata';
import { Students } from '../../app/models/students';
import { Globals } from '../../app/models/globals';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public UserResp: Users=new Users();
  public CompanyUsers: Users[] = [];
  public SaveUserSignUp: string;
  public SaveOneCompanyUser: boolean = false;
  public updateUserResp: boolean = false;
  public SentEmail: boolean;
  public deleteUserResp: boolean;
  public changedPassword: boolean;
  constructor(private http: HttpClient, private global: Globals) { }

	//LOGIN USRER
	Login(user: Users){
	return new Promise((resolve, reject) => {
	
	  const params = {
            Podatoci: JSON.stringify(user)
        };
	   const jsonParams = JSON.stringify(params);
        return this.http.put<any>(this.global.ApiURL + "/login", JSON.stringify(jsonParams), {
            headers: {
                "Content-Type": "application/json"
            }
        }).subscribe(resp => {
			this.UserResp=resp;
			resolve(resp);
		
		})
	});
	}

	//GET COMPANY USERS
  	getCompanyUsers(){
		return new Promise((resolve, reject) => {
		 const user = JSON.parse(localStorage.getItem('currentUser'));
		 const params = {
			 Login: user,
			 Metod:"CompanyUsers"
		  };
		  const jsonParams = JSON.stringify(params);
		  return this.http.put<any>(this.global.ApiURL + "/selectmany", JSON.stringify(jsonParams), {
			  headers: {
				  "Content-Type": "application/json"
			  }
		  }).subscribe(resp => {
			  this.CompanyUsers = resp;
			  resolve(resp);
		  })

	  });
		}

	//SAVE COMPANY USER
	saveCompanyUser(user: Users) {
		return new Promise((resolve, reject) => {
			const params = {
				Login: user,
				Metod: "CompanyUsers",
				Podatoci: JSON.stringify(user)
			};
			const jsonParams = JSON.stringify(params);
			return this.http.put<any>(this.global.ApiURL + "/saveone", JSON.stringify(jsonParams), {
				headers: {
					"Content-Type": "application/json"
				}
			}).subscribe(resp => {
				this.SaveOneCompanyUser = resp;
				resolve(resp);
			})
		});
    }

	//DELETE USER
	deleteUser(user: Users) {
		return new Promise((resolve, reject) => {
			const params = {
				Login: user,
				Metod: "User",
				Podatoci: JSON.stringify(user),
			};
			const jsonParams = JSON.stringify(params);
			return this.http.put<any>(this.global.ApiURL + "/deleteone", JSON.stringify(jsonParams), {
				headers: {
					"Content-Type": "application/json"
				}
			}).subscribe(resp => {
				this.deleteUserResp = resp;
				resolve(resp);
			})

		});

	}

	//SIGNUP USER
	Signup(user: Users, student: Students, skills: Skills[]){
  	return new Promise((resolve, reject) => {
		const params = {
			Login: user,
            Podatoci: JSON.stringify(student),
			Parametar: JSON.stringify(skills)
        };
		const jsonParams = JSON.stringify(params);
		  return this.http.put<any>(this.global.ApiURL + "/signup", JSON.stringify(jsonParams), {
            headers: {
                "Content-Type": "application/json"
            }
        }).subscribe(resp => {
			this.SaveUserSignUp=resp;
			resolve(resp);
		})
	});
  }

	//RESET  PASSWORD
	ResetPassword(user: Users){
  	return new Promise((resolve, reject) => {
		const params = {
			Login: user
        };
		const jsonParams = JSON.stringify(params);
		  return this.http.put<any>(this.global.ApiURL + "/changepassword", JSON.stringify(jsonParams), {
            headers: {
                "Content-Type": "application/json"
            }
        }).subscribe(resp => {
			this.SentEmail=resp.poraka;
			resolve(resp);
		})
	});
  }
	SetNewPassword(user: Users, findData: Finddata){
  	return new Promise((resolve, reject) => {
		const params = {
			Login: user,
			Podatoci: JSON.stringify(findData)
        };
		const jsonParams = JSON.stringify(params);
		  return this.http.put<any>(this.global.ApiURL + "/setnewpassword", JSON.stringify(jsonParams), {
            headers: {
                "Content-Type": "application/json"
            }
        }).subscribe(resp => {
			this.changedPassword=resp;
			resolve(resp);
		})
	});
	}

	//UPDATE USER
	updateUser(user: Users) {
		return new Promise((resolve, reject) => {
			const params = {
				Metod: "Users",
				Podatoci: JSON.stringify(user)
			};
			const jsonParams = JSON.stringify(params);
			return this.http.put<any>(this.global.ApiURL + "/editone", JSON.stringify(jsonParams), {
				headers: {
					"Content-Type": "application/json"
				}
			}).subscribe(resp => {
				this.updateUserResp = resp;
				resolve(resp);
			})
		});

	}

   // LOGOUT
    Logout() {
        localStorage.removeItem('currentUser');
    }

    isLoggedIn() {
        const user = localStorage.getItem('currentUser');
        if (user)
            return true;
        else
            return false;
    }

	getRole() {
		const user: any = JSON.parse(localStorage.getItem('currentUser'));
		return user.role;
    }

}