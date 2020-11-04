import { Injectable } from '@angular/core';

import { ConsolePrintService } from './console-print.service';

@Injectable()
export class GeneratorService {

  constructor(private consolePrintService: ConsolePrintService) { }

  generate(charactersLength: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < charactersLength; i++) {
      const characterToAdd = characters.charAt(Math.floor(Math.random() * charactersLength));
      result += characterToAdd;
      this.consolePrintService.print(`${characterToAdd} character was added`);
    }
    return result;
  }
}
