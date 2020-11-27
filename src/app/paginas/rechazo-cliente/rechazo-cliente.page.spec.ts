import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RechazoClientePage } from './rechazo-cliente.page';

describe('RechazoClientePage', () => {
  let component: RechazoClientePage;
  let fixture: ComponentFixture<RechazoClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechazoClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RechazoClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
