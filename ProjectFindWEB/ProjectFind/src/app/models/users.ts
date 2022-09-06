import { Role } from '../../app/enums/role.enum';
import { Gender } from '../../app/enums/gender.enum';

export class Users {
  id: string;
  role: Role;
  gender: Gender;
  username: string;
  password: string;
  email: string;
  active: boolean;
  image: string;
  company_Id: string;
  name: string;
  student_Id: number;
  constructor(
		id?: string,
		role?: Role,
		gender?: Gender,
		username?: string,
		password?: string,
		email?: string,
		active?: boolean,
		image?: string,
		company_Id?: string,
		name?: string,
		student_Id?: number
  ){
		this.id=id;
		this.role=role;
		this.gender=gender;
		this.username=username;
		this.password=password;
		this.email=email;
		this.active=active;
		this.image=image;
		this.company_Id = company_Id;
		this.name = name;
		this.student_Id=student_Id;
  }

  
}
