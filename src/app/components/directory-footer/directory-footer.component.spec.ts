import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryFooterComponent } from './directory-footer.component';

describe('DirectoryFooterComponent', () => {
  let component: DirectoryFooterComponent;
  let fixture: ComponentFixture<DirectoryFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectoryFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectoryFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
