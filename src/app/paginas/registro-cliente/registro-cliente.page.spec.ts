import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegistroClientePage } from './registro-cliente.page';

describe('RegistroClientePage', () => {
  let component: RegistroClientePage;
  let fixture: ComponentFixture<RegistroClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
