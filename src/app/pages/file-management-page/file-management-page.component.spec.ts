import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileManagementPageComponent } from './file-management-page.component';

describe('FileManagementPageComponent', () => {
  let component: FileManagementPageComponent;
  let fixture: ComponentFixture<FileManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
