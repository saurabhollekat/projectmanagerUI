import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../Service/project.service';
import { Task } from '../../Model/Task';
import { Project } from '../../Model/Project';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SortPipe } from '../../Pipe/sort.pipe';
import { DatePipe } from '@angular/common';
import { DateSortPipe } from '../../Pipe/datesort.pipe';
@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css'],
  providers: [SortPipe, DateSortPipe]
})
export class ViewtaskComponent implements OnInit {
  searchTitle: string;
  lstItem: Project[];
  lstProjects: Project[];
  selectedproject: Project;
  projectName: string;
  lstTasks: Task[];
  templstTasks: Task[];

  constructor(private _projservice: ProjectService, private _router: Router,
    private _datePipe: DatePipe, private _sortPipe: SortPipe, private _dateSort: DateSortPipe) {
    this.lstTasks = [];
    this.templstTasks = [];
    this.getAllTasks();
  }


  getAllTasks() {
    this._projservice.getallTasks().subscribe(res => {
      this.templstTasks = res;
      this.templstTasks.forEach(task => {
        if (!task.IsParentTask) {
          this.lstTasks.push(task);
        }
      });
    })
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    fromEvent(document.getElementById("txtUsrSrch"), "input").pipe(map((e: KeyboardEvent) => (<HTMLInputElement>e.target).value)
      , debounceTime(100)
      , distinctUntilChanged()
      , switchMap((searchTerm) =>
        this._projservice.getProjectByName(searchTerm)
      ))
      .subscribe(c => {
        this.lstItem = c;
      });
  }
  onPrjSearchClick() {
    this.searchTitle = "Search Projects";
    this.lstItem = [];
    this._projservice.getallProjects().subscribe(res => this.lstItem = res);
  }

  handleChange(evt) {
    this.selectedproject = evt;
    /// console.log(evt);
  }


  onSelection() {
    if (this.selectedproject.ProjectID > 0) {
      this.projectName = this.selectedproject.ProjectName;
      this.lstTasks = [];
      this._projservice.getTaskByProjectId(this.selectedproject.ProjectID).subscribe(res => this.lstTasks = res);
    }
  }

  editTask(obj) {
    this._router.navigate(['updatetask', obj.TaskID]);
  }

  endTask(obj) {

    if (this._datePipe.transform(obj.StartDate, 'yyyy-MM-dd') > this._datePipe.transform(new Date(), 'yyyy-MM-dd')) {
      obj.StartDate = this._datePipe.transform(new Date(), 'yyyy-MM-dd');
    }

    obj.EndDate = this._datePipe.transform(new Date(), 'yyyy-MM-dd');

    this._projservice.addTask(obj).subscribe(r => {
      if (this.selectedproject != null) {
        this._projservice.getTaskByProjectId(this.selectedproject.ProjectID).subscribe(res => this.lstTasks = res);
      }
      else {
        this.lstTasks=[];
        this.getAllTasks();
      }
    })
  }

  sortByPriority() {
    this.lstTasks = this._sortPipe.transform(this.lstTasks, "Priority");
  }

  sortByStarDate() {
    this.lstTasks = this._dateSort.transform(this.lstTasks, "StartDate");
  }
  sortByEndDate() {
    this.lstTasks = this._dateSort.transform(this.lstTasks, "EndDate");
  }
}

