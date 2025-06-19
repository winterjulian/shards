import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexerToolComponent } from './indexer-tool.component';

describe('IndexerToolComponent', () => {
  let component: IndexerToolComponent;
  let fixture: ComponentFixture<IndexerToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexerToolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexerToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
