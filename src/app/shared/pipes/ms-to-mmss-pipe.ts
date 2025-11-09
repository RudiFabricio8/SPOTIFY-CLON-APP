import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToMmss',
  standalone: false
})
export class MsToMmssPipe implements PipeTransform {
  transform(value: number | null): string {
    if (value === null || isNaN(value) || value < 0) {
      return '00:00';
    }

    const totalSeconds = Math.floor(value / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}