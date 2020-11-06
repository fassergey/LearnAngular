import { Injectable } from '@angular/core';

@Injectable()
export class GeneratorService {

  constructor() { }

  generate(charactersLength: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < charactersLength; i++) {
      const characterToAdd = characters.charAt(Math.floor(Math.random() * charactersLength));
      result += characterToAdd;
    }
    return result;
  }
}
