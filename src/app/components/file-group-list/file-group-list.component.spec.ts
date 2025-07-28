import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileGroupListComponent } from './file-group-list.component';

describe('FileGroupListComponent', () => {
  let component: FileGroupListComponent;
  let fixture: ComponentFixture<FileGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileGroupListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
