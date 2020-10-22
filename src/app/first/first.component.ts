import { Component, OnInit, Optional } from '@angular/core';

import { GeneratorService } from '../core/services/generator.service';
import { ConstantService } from '../core/services/constant.service';
import { ConfigOptionsService } from '../core/services/config-options.service';
import { LocalStorageService } from '../core/services/local-storage.service';
import { Category } from '../shared/models/category.enum';

export function generatorFactory() {
  console.log();
  return new GeneratorService();
}

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
  providers: [
    { provide: LocalStorageService, useClass: LocalStorageService },
    { provide: ConfigOptionsService, useClass: ConfigOptionsService },
    { provide: ConstantService, useValue: { Application: 'TaskManager', Version: '1.0', ApiUrl: 'http://someurl.com', Company: 'Fasolko production' } },
    { provide: GeneratorService, useFactory: generatorFactory, deps: [] }
  ]
})
export class FirstComponent implements OnInit {
  name: string;
  description: string;
  price: number;
  categories: Category[];
  isAvailable: boolean;

  constructor(
    @Optional() localStorageService?: LocalStorageService,
    @Optional() configOptionsService?: ConfigOptionsService,
    @Optional() constantService?: ConstantService,
    @Optional() generatorService?: GeneratorService
  ) { }

  ngOnInit(): void {
    this.name = 'First name';
    this.description = 'First description';
    this.price = 10.00;
    this.categories = [ Category.Sport, Category.Food ];
    this.isAvailable = true;
  }

}
