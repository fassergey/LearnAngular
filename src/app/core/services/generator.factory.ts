import { InjectionToken } from '@angular/core';
import { GeneratorService } from './generator.service';

export const generatorServiceToken = new InjectionToken<string>('generator token');

export function generatorFactory(n: number) {
  return (generatorService: GeneratorService) => generatorService.generate(n);
}

