import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListHeaderComponent } from './file-list-header.component';

describe('FileListHeaderComponent', () => {
  let component: FileListHeaderComponent;
  let fixture: ComponentFixture<FileListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileListHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
