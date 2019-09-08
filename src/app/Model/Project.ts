import { User } from "./User";

export class Project{

    ProjectID:number;
    ProjectName:string;
    NoOfTasks:number;
    CompletedTasks:number;
    StartDate:Date;
    EndDate:Date;
    Priority:number;
    Manager:User;
}