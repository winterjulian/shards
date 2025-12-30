import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListRowComponent } from './file-list-row.component';

describe('FileListRowComponent', () => {
  let component: FileListRowComponent;
  let fixture: ComponentFixture<FileListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileListRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileListRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
