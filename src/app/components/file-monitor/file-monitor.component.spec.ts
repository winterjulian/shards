import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileMonitorComponent } from './file-monitor.component';

describe('FileControllerComponent', () => {
  let component: FileMonitorComponent;
  let fixture: ComponentFixture<FileMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileMonitorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
