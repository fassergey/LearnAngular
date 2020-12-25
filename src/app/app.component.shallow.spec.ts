/*
 * Shallow Test
 */
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';

import { RouterLinkStubDirective } from './testing-helpers';
import { AppComponent } from './app.component';
import { LocalStorageService } from './core/services/local-storage.service';

let fixture: ComponentFixture<AppComponent>;
let links: RouterLinkStubDirective[];
let linkDes: DebugElement[];

describe('AppComponent (Shallow)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, RouterLinkStubDirective],
      imports: [HttpClientTestingModule],
      providers: [LocalStorageService],
      // Подсказка компилятору игнорировать нераспознанные элементы и атрибуты
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(AppComponent);
    // Запускаем первоначальную инициализацию
    fixture.detectChanges();

    // Находим DebugElements с помощью директивы RouterLinkStubDirective
    // Для поиска можно использовать не только By.css, но и By.directive
    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    );

    // Получаем экземплры директив с помощью DebugElement инджектора
    // Ангуляр всегда добавляет директивы к инджектору компонента
    links = linkDes.map(
      d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective
    );
  });


  beforeEach(() => {});

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(4, 'should have 4 links');
    expect(links[0].linkParams).toBe(
      '/product-list',
      '1st link should go to Products'
    );
    expect(links[1].linkParams).toBe('/cart', '2nd link should go to Cart');
    expect(links[2].linkParams).toBe('/first', '3rd link should go to Cart');
    expect(links[3].linkParams).toBe('/admin', '4th link should go to Cart');
  });

  it('can click Products link in template', () => {
    const productLinkDe = linkDes[0];
    const productLink = links[0];

    expect(productLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    productLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(productLink.navigatedTo).toBe('/product-list');
  });
});
