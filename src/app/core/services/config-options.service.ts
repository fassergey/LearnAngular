import { Injectable } from '@angular/core';

import { ConfigModel } from '../models/config';

@Injectable()
export class ConfigOptionsService {
  private config: ConfigModel;

  // такой метод не позволит доустановить какие-то свойства, надо устанавливать все
  // тут хотел, чтобы вы использовали спред оператор или Object.assign
  setConfigProperties(configToSave: ConfigModel): void {
    this.config = configToSave;
  }

  getConfigProperties(): ConfigModel {
    return this.config;
  }
}
