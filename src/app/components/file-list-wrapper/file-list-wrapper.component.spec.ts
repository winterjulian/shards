import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListWrapperComponent } from './file-list-wrapper.component';

describe('FileListWrapperComponent', () => {
  let component: FileListWrapperComponent;
  let fixture: ComponentFixture<FileListWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileListWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileListWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
