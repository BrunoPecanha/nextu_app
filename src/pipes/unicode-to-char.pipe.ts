import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'unicodeToChar' })
export class UnicodeToCharPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;
    
    const hex = value.replace(/\\u\{?([0-9a-fA-F]+)\}?/g, '$1');
    return String.fromCodePoint(parseInt(hex, 16));
  }
}