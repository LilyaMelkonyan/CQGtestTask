import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNumber',
})
export class ShortNumberPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (!value) return '0';

    if (value < 1_000) return value.toString();

    if (value < 1_000_000) {
      return `${Math.floor(value / 1_000)}K`
    }

    return `${Math.floor(value/1_000_000)}M`
  }
}
