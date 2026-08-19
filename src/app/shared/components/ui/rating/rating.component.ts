import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-1 cursor-pointer">
      @for (star of stars; track $index) {
        <svg 
          (click)="rate($index + 1)"
          class="w-5 h-5 transition-colors"
          [ngClass]="$index < value ? 'text-brand-magenta fill-brand-magenta' : 'text-gray-300 fill-gray-300'"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      }
    </div>
  `
})
export class RatingComponent {
  @Input() value: number = 0;
  @Input() max: number = 5;
  @Output() valueChange = new EventEmitter<number>();

  get stars() { return Array(this.max).fill(0); }

  rate(rating: number) {
    this.valueChange.emit(rating);
  }
}
