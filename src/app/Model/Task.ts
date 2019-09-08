import { Project } from "./Project";
import { User } from "./User";

export class Task {
    TaskID: number;
    TaskName: string;
    ParentTaskName: string;
    ParentTaskID: number;
    Priority: number;
    StartDate: Date;
    EndDate: Date;
    Project :Project;
    User:User;
    IsParentTask:boolean;
    Status:string;
}