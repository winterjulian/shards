import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShardsRepositionerComponent } from './shards-repositioner.component';

describe('ShardsRepositionerComponent', () => {
  let component: ShardsRepositionerComponent;
  let fixture: ComponentFixture<ShardsRepositionerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShardsRepositionerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShardsRepositionerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
