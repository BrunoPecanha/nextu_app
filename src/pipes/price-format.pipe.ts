import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {

  transform(value: number | string): string {
    if (value === null || value === undefined || value === '') return '';

    let numberValue: number;

    if (typeof value === 'string') {
      numberValue = parseFloat(value.replace(',', '.'));
    } else {
      numberValue = value;
    }

    if (isNaN(numberValue)) return '';

    return numberValue.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
