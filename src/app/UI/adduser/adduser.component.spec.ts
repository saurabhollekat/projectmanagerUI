import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserComponent } from './adduser.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from '../../Service/project.service';
import { DatePipe } from '@angular/common';
import { SortPipe } from '../../Pipe/sort.pipe';
import { DateSortPipe } from '../../Pipe/datesort.pipe';
import { Observable, of } from 'rxjs';
import { User } from '../../Model/User';

describe('AdduserComponent', () => {
  let component: AdduserComponent;
  let fixture: ComponentFixture<AdduserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientModule, RouterTestingModule],
      declarations: [AdduserComponent]
    })
      .overrideComponent(AdduserComponent, {
        set: {
          providers: [{ provide: ProjectService, useClass: MockProjectService }, { provide: DatePipe }, { provide: SortPipe },
          { provide: DateSortPipe }]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('adduser test', () => {
    component.addUser();
    expect(component.ResponseMsg).toEqual("User added successfully");
    expect(component.lstUsers.length).toEqual(2);
  });
  it('delete user test', () => {
    let user:User;
    user=new User();
    user.UserId=100;
    user.FirstName="Manish";
    component.delete(user);
    expect(component.ResponseMsg).toEqual("User deleted successfully");
    expect(component.lstUsers.length).toEqual(2);
  });
});

class MockProjectService {
  addUser(): Observable<any> {
    return of("User added successfully");
  }
  deleteUser(user:User): Observable<any> {
    return of("User deleted successfully");
  }
  getallUsers(): Observable<any> {
    return of([{ 'UserId': 101, 'FirstName': 'Animesh', 'LastName': 'Singh' },
    { 'UserId': 102, 'FirstName': 'Shreya', 'LastName': 'Singh' }]);
  }
}