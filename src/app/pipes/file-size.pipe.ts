import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesize',
  standalone: true, // falls du modern Angular nutzt
})
export class FilesizePipe implements PipeTransform {

  transform(
    bytes: number | null | undefined,
    fractionDigits = 2
  ): string {
    if (bytes === null || bytes === undefined) return '–';
    if (bytes === 0) return '0 B';

    const k = 1000;
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    let value = bytes;

    while (value >= k && unitIndex < units.length - 1) {
      value /= k;
      unitIndex++;
    }

    return `${value.toFixed(fractionDigits)} ${units[unitIndex]}`;
  }
}
