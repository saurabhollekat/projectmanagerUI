import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtaskComponent } from './viewtask.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from '../../Service/project.service';
import { DatePipe } from '@angular/common';
import { SortPipe } from '../../Pipe/sort.pipe';
import { DateSortPipe } from '../../Pipe/datesort.pipe';
import { Observable, of } from 'rxjs';

describe('ViewtaskComponent', () => {
  let component: ViewtaskComponent;
  let fixture: ComponentFixture<ViewtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [ViewtaskComponent]
    })
      .overrideComponent(ViewtaskComponent, {
        set: {
          providers: [{ provide: ProjectService, useClass: MockProjectService }, { provide: DatePipe }, { provide: SortPipe },
          { provide: DateSortPipe }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get all tasks', () => {
    component.lstTasks = [];
    component.getAllTasks();
    expect(component.lstTasks.length).toEqual(1);
  });

  it('get all projects', () => {
    component.onPrjSearchClick();
    expect(component.lstItem.length).toEqual(2);
  });
});

class MockProjectService {
  getallTasks(): Observable<any> {
    return of([{ 'TaskID': '100', 'TaskName': 'Integrated Receivables', 'StartDate': '2018-09-23', 'EndDate': '2018-09-25' }]);
  }
  getallProjects(): Observable<any> {
    return of([{ 'ProjectID': 101, 'ProjectName': 'Receivables Edge' },
    { 'ProjectID': 102, 'ProjectName': 'ACL' }])
  }
}