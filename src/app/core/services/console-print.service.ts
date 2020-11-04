import { Injectable } from '@angular/core';

@Injectable()
export class ConsolePrintService {
  print(message: string): void {
    console.log(message);
  }
}
