import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShardsManagementPageComponent } from './shards-management-page.component';

describe('ShardsManagementPageComponent', () => {
  let component: ShardsManagementPageComponent;
  let fixture: ComponentFixture<ShardsManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShardsManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShardsManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
