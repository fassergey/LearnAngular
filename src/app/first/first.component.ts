import { Component, OnInit, Optional } from '@angular/core';

import { GeneratorService } from '../core/services/generator.service';
import { ConstantService } from '../core/services/constant.service';
import { ConfigOptionsService } from '../core/services/config-options.service';
import { LocalStorageService } from '../core/services/local-storage.service';
import { Category } from '../shared/models/category.enum';
import { ConfigModel } from '../core/models/config';
import { ConsolePrintService } from '../core/services/console-print.service';

export function generatorFactory(consolePrintService: ConsolePrintService) {
  return new GeneratorService(consolePrintService);
}

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
  providers: [
    ConsolePrintService,
    { provide: LocalStorageService, useClass: LocalStorageService },
    { provide: ConfigOptionsService, useClass: ConfigOptionsService },
    { provide: ConstantService, useValue: { Application: 'TaskManager', Version: '1.0', ApiUrl: 'http://someurl.com', Company: 'Fasolko production' } },
    { provide: GeneratorService, useFactory: generatorFactory, deps: [ConsolePrintService] }
  ]
})
export class FirstComponent implements OnInit {
  name: string;
  description: string;
  price: number;
  categories: Category[];
  isAvailable: boolean;

  constructor(
    @Optional() private localStorageService?: LocalStorageService,
    @Optional() private configOptionsService?: ConfigOptionsService,
    @Optional() private constantService?: ConstantService,
    @Optional() private generatorService?: GeneratorService
  ) { }

  ngOnInit(): void {
    this.name = 'First name';
    this.description = 'First description';
    this.price = 10.00;
    this.categories = [ Category.Sport, Category.Food ];
    this.isAvailable = true;

    this.localStorageServiceTests();
    this.configOptionsServiceTests();
    this.constantsServiceTests();
    this.generatorServiceTests();
  }

  private localStorageServiceTests(): void {
    console.log('======= LocalStorageService ========');
    if (!this.localStorageService) {
      console.log('LocalStorageService is null');
    } else {
      const key = 'key';
      console.log('Set string value:');
      this.localStorageService.setItem(key, 'value12345');
      console.log(`The value is: ${this.localStorageService.getItem(key)}`);

      console.log('Set object value:');
      this.localStorageService.setItem(key, { name: 'value12345', age: 32 });
      console.log(`The value is: ${JSON.stringify(this.localStorageService.getItem(key))}`);

      console.log('Remove value');
      this.localStorageService.removeItem(key);
      console.log(`The value is: ${this.localStorageService.getItem(key)}`);
    }
    console.log('====================================');
  }

  private configOptionsServiceTests(): void {
    console.log('======= ConfigOptionsService ========');
    if (!this.configOptionsService) {
      console.log('ConfigOptionsService is null');
    } else {
      const configFull = new ConfigModel();
      configFull.id = '1';
      configFull.login = 'sergii-1';
      configFull.role = 'user';
      configFull.email = 'example@email.com';
      configFull.address = 'somewhere';
      configFull.alternativeEmail = 'reserved@email.com';
      console.log('Set properties:');
      this.configOptionsService.setConfigProperties(configFull);
      console.log(`The value is: ${JSON.stringify(this.configOptionsService.getConfigProperties())}`);
      const configPartial = new ConfigModel();
      configPartial.id = '2';
      configPartial.login = 'sergii-2';
      configPartial.role = 'user';
      console.log('Set partial properties:');
      this.configOptionsService.setConfigProperties(configPartial);
      console.log(`The value is: ${JSON.stringify(this.configOptionsService.getConfigProperties())}`);
    }
    console.log('====================================');
  }

  private constantsServiceTests(): void {
    console.log('======= ConstantsService ========');
    if (!this.constantService) {
      console.log('ConstantsService is null');
    } else {
      console.log(`The value is: ${JSON.stringify(this.constantService)}`);
    }
    console.log('====================================');
  }

  private generatorServiceTests(): void {
    console.log('======= GeneratorService ========');
    if (!this.generatorService) {
      console.log('GeneratorService is null');
    } else {
      const generatedResult = this.generatorService.generate(6);
      console.log(`The generated value is: ${generatedResult}`);
    }
    console.log('====================================');
  }
}
