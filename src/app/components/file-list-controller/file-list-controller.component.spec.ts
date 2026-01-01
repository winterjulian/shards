import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListControllerComponent } from './file-list-controller.component';

describe('FileListControllerComponent', () => {
  let component: FileListControllerComponent;
  let fixture: ComponentFixture<FileListControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileListControllerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileListControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
