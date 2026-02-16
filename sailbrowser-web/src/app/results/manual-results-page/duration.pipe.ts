import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true,
  pure: true,
})
export class DurationPipe implements PipeTransform {
  transform(totalSeconds: number | null | undefined): string | null {
    if (totalSeconds == null || totalSeconds < 0) {
      return null;
    }

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);
    
    const pad = (n: number) => n.toString().padStart(2, '0');

    if (h > 0) {
      return `${pad(h)}:${pad(m)}:${pad(s)}`;
    }
    return `${pad(m)}:${pad(s)}`;
  }
}
