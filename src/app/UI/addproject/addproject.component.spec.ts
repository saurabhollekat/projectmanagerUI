import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprojectComponent } from './addproject.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from '../../Service/project.service';
import { DatePipe } from '@angular/common';
import { of, Observable } from 'rxjs';
import { SortPipe } from '../../Pipe/sort.pipe';
import { DateSortPipe } from '../../Pipe/datesort.pipe';

describe('AddprojectComponent', () => {
  let component: AddprojectComponent;
  let fixture: ComponentFixture<AddprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprojectComponent ],
      imports:[FormsModule,HttpClientModule,RouterTestingModule],
    })
    .overrideComponent(AddprojectComponent,{
      set: {
        providers: [{ provide: ProjectService, useClass: MockProjectService },{provide:DatePipe},{provide:SortPipe},
        {provide:DateSortPipe}]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('get all projects test', () => {
    component.getAllProjects();
    expect(component.lstprojects.length).toEqual(2);
  });
  it('add project test',()=>{
    component.addProject();
    expect(component.responseMsg).toEqual("Project added successfully");
  })
  it('get all users test',()=>{
    component.onSearchClick();
    expect(component.lstItem.length).toEqual(2);
  })
});

class MockProjectService {

  getallProjects():Observable<any>{
      return of([{'ProjectID':101,'ProjectName':'Receivables Edge'},
                 {'ProjectID':102,'ProjectName':'ACL'}])
    }
    addProject():Observable<any>{
      return of("Project added successfully");
    }

    getallUsers():Observable<any>{
      return of([{'UserId':101,'FirstName':'Abhinav','LastName':'Joshi'},
                 {'UserId':102,'FirstName':'Abhijeet','LastName':'Singh'}])
    }
  }


