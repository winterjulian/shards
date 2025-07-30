import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListFooterComponent } from './file-list-footer.component';

describe('FileListFooterComponent', () => {
  let component: FileListFooterComponent;
  let fixture: ComponentFixture<FileListFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileListFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileListFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
