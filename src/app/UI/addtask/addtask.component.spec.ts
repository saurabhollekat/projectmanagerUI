import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddtaskComponent } from './addtask.component';
import { Task } from '../../Model/Task';
import { Observable, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from '../../Service/project.service';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Project } from '../../Model/Project';
import { doesNotThrow } from 'assert';

describe('AddtaskComponent', () => {
  let component: AddtaskComponent;
  let fixture: ComponentFixture<AddtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule,HttpClientModule,RouterTestingModule],
      declarations: [AddtaskComponent]
    })
    .overrideComponent(AddtaskComponent,{
      set: {
        providers: [{ provide: ProjectService, useClass: MockTaskService1 },{provide:DatePipe}]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('add task test', () => {
    component.isPrntTskChckd=false;
    component.addTask();
    expect(component.responseMsg).toEqual("Task added successfully");
  });
   it('add parent task test', () => {
    component.isPrntTskChckd=true;
    component.addTask();
    expect(component.responseMsg).toEqual("Parent Task added successfully");
  });
  it('get project by name test', (done) => {
    component.searchId=1;
    component.searchText("Rec").subscribe(r=>
      expect(r.length).toEqual(1),
      done())
  });
  it('get user by name test', (done) => {
    component.searchId=3;
    component.searchText("Abhi").subscribe(p=>
      expect(p.length).toEqual(2),done())
   });
});

  class MockTaskService1 {
    addTask(taskObj: Task): Observable<any> {
           return of("Task added successfully");
         }
         addparentTask(taskObj: Task): Observable<any> {
          return of("Parent Task added successfully");
        }
        getProjectByName(searchTerm:string):Observable<any>{
          return of([{'ProjectID':101,'ProjectName':'Receivables Edge'}])
        }

        getUserByName(searchTerm:string):Observable<any>{
          return of([{'UserId':101,'FirstName':'Animesh','LastName':'Singh'},
                     {'UserId':102,'FirstName':'Shreya','LastName':'Singh'}])
        }
  }