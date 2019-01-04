
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPrincipalComponent } from './panel-principal.component';

describe('PanelPrincipalComponent', () => {
  let component: PanelPrincipalComponent;
  let fixture: ComponentFixture<PanelPrincipalComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
