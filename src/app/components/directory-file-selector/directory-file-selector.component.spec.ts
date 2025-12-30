import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryFileSelectorComponent } from './directory-file-selector.component';

describe('DirectoryFileSelectorComponent', () => {
  let component: DirectoryFileSelectorComponent;
  let fixture: ComponentFixture<DirectoryFileSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectoryFileSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectoryFileSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
