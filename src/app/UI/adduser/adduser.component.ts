import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProjectService } from '../../Service/project.service';
import { User } from '../../Model/User';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators/';
import { SortPipe } from '../../Pipe/sort.pipe';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit, AfterViewInit {

  firstNm: string;
  lastNm: string;
  empId: number;
  usrObj: User = new User();
  ResponseMsg: string;
  lstUsers: User[];
  buttonText: string = "";
  searchText: string = "";
  constructor(private _projectService: ProjectService, private _router: Router, private _sort: SortPipe) {
    this.getallUser();
    this.buttonText = "Add";
    //console.log($("#srchProject").text);


  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    fromEvent(document.getElementById("srchProject"), "input").pipe(map((e: KeyboardEvent) => (<HTMLInputElement>e.target).value)
      , debounceTime(100)
      , distinctUntilChanged()
      , switchMap((searchTerm) =>
        this._projectService.getUserByName(searchTerm)
      ))
      .subscribe(c => {
        // console.log(c);
        this.lstUsers = c;
      });
  }

  getallUser() {
    this._projectService.getallUsers().subscribe(res => {
      this.lstUsers = res;
    });
  }
  addUser() {
    // this.usrObj.FirstName = this.firstNm;
    // this.usrObj.LastName = this.lastNm;
    // this.usrObj.EmployeeId = this.empId;
    this._projectService.addUser(this.usrObj).subscribe(r => {
      this.ResponseMsg = r;
      this.getallUser();
    });
  }
  edit(obj) {
    this.buttonText = "Update";
    this.usrObj = obj;
  }
  delete(obj) {
    this._projectService.deleteUser(obj).subscribe(r => {
      this.ResponseMsg = r;
      this.getallUser();
    });
  }

  reset() {
    this.usrObj = new User();
  }

  SortByFN() {
    this.lstUsers = this._sort.transform(this.lstUsers, "FirstName");
  }

  SortByLN() {
    this.lstUsers = this._sort.transform(this.lstUsers, "LastName");
  }
  SortByID() {
    this.lstUsers = this._sort.transform(this.lstUsers, "EmployeeId");
  }
}
