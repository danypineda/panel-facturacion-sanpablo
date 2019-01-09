/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VentasListarComponent } from './ventas-listar.component';

describe('VentasListarComponent', () => {
  let component: VentasListarComponent;
  let fixture: ComponentFixture<VentasListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
