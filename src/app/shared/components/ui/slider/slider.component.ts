import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full h-[400px] overflow-hidden rounded-xl bg-gray-900 group">
      <img [src]="images[currentIndex]" class="absolute inset-0 w-full h-full object-cover opacity-60" />
      
      <div class="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
        <h2 class="text-4xl font-bold mb-4">{{ title }}</h2>
        <p class="text-sm mb-6 max-w-lg">{{ subtitle }}</p>
        <ng-content></ng-content> <!-- For action buttons -->
      </div>

      <button (click)="prev()" class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm transition-all">&lt;</button>
      <button (click)="next()" class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-sm transition-all">&gt;</button>

      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        @for (img of images; track $index) {
          <div class="w-2 h-2 rounded-full transition-all" [ngClass]="$index === currentIndex ? 'bg-white w-4' : 'bg-white/50'"></div>
        }
      </div>
    </div>
  `
})
export class SliderComponent {
  @Input() images: string[] = [];
  @Input() title: string = 'Example Slider';
  @Input() subtitle: string = 'Lorem ipsum dolor sit amet.';
  currentIndex = 0;

  next() { this.currentIndex = (this.currentIndex + 1) % this.images.length; }
  prev() { this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length; }
}
