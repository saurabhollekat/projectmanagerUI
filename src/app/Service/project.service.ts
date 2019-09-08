import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/User';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Task } from '../Model/Task';
import { Project } from '../Model/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  apiBaseUrl: string = "http://localhost/ProjectManager.API/api/";
  // apiBaseUrl: String = 'http://localhost:50365/api/';

  constructor(private _http: HttpClient) { }

  addUser(obj: User): Observable<any> {
    return this._http.post(this.apiBaseUrl + "adduser", obj).pipe(map(res => res));
  }

  getUserByName(name: string): Observable<any> {
    return this._http.get(this.apiBaseUrl + "getuserbyname/" + name).pipe(map(res => res));
  }
  deleteUser(obj: User): Observable<any> {
    return this._http.post(this.apiBaseUrl + "deleteuser", obj).pipe(map(res => res));
  }

  getallTasks(): Observable<any> {
    return this._http.get(this.apiBaseUrl + "getalltasks").pipe(map(res => res));
  }

  getallProjects(): Observable<any> {
    return this._http.get(this.apiBaseUrl + "getallprojects").pipe(map(res => res));
  }

  getProjectByName(name:string):Observable<any>{
    return this._http.get(this.apiBaseUrl + "getprojectbyname/" + name).pipe(map(res => res));
  }

  getallUsers(): Observable<any> {
    return this._http.get(this.apiBaseUrl + "getallusers").pipe(map(res => res));
  }

  addProject(obj: Project): Observable<any> {
    return this._http.post(this.apiBaseUrl + "addproject", obj).pipe(map(res => res));
  }

  addTask(obj: Task): Observable<any> {
    console.log(obj.EndDate)
    return this._http.post(this.apiBaseUrl + "addtask", obj).pipe(map(res => res));
  }

  gettaskById(id: number): Observable<any> {
    return this._http.get(this.apiBaseUrl + "gettaskbyid/" + id).pipe(map(res => res));
  }

  addparentTask(obj: Task): Observable<any> {
    return this._http.post(this.apiBaseUrl + "addparenttask", obj).pipe(map(res => res));
  }

  getparentTaskByName(name:string): Observable<any> {
    return this._http.get(this.apiBaseUrl + "getprnttaskbyname/"+name).pipe(map(res => res));
  }

  getTaskByProjectId(id:number):Observable<any>{
        return this._http.get(this.apiBaseUrl + "gettaskbyprojectid/"+id).pipe(map(res => res));
    }
  }

