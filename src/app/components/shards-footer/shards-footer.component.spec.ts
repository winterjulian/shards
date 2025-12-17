import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShardsFooterComponent } from './shards-footer.component';

describe('ShardsFooterComponent', () => {
  let component: ShardsFooterComponent;
  let fixture: ComponentFixture<ShardsFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShardsFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShardsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
