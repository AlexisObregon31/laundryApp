import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LavanderiaPrendaPage } from './lavanderia-prenda.page';

describe('LavanderiaPrendaPage', () => {
  let component: LavanderiaPrendaPage;
  let fixture: ComponentFixture<LavanderiaPrendaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LavanderiaPrendaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LavanderiaPrendaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
