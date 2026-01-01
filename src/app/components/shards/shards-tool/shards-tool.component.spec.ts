import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShardsToolComponent } from './shards-tool.component';

describe('ShardsToolComponent', () => {
  let component: ShardsToolComponent;
  let fixture: ComponentFixture<ShardsToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShardsToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShardsToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
