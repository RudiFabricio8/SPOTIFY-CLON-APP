import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongCardComponent } from './song-card';

describe('SongCard', () => {
  let component: SongCardComponent;
  let fixture: ComponentFixture<SongCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
