export class Projects {
    id: number;
    name: string;
    description: string;
    user_Id: number;
    user_Name: string;
    user_Email: string;
    constructor(
        id?: number,
        name?: string,
        description?: string,
        user_Id?: number,
        user_Name?: string,
        user_Email?: string

    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.user_Id = user_Id;
        this.user_Name = user_Name;
        this.user_Email = user_Email;
    }
}
