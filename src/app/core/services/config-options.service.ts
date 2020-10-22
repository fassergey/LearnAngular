import { Injectable } from '@angular/core';

import { ConfigModel } from '../models/config';

@Injectable()
export class ConfigOptionsService {
  private config: ConfigModel;

  setConfigProperties(configToSave: ConfigModel): void {
    this.config = configToSave;
  }

  getConfigProperties(): ConfigModel {
    return this.config;
  }
}
