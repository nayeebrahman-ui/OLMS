import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blur-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="[
      'relative overflow-hidden rounded-xl',
      type === 'layer' ? blurClasses[level] : backdropClasses[level]
    ]">
      <ng-content></ng-content>
    </div>
  `
})
export class BlurOverlayComponent {
  @Input() type: 'layer' | 'backdrop' = 'backdrop';
  @Input() level: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' = 'md';

  // Applies blur to the container itself vs the content behind it
  blurClasses = {
    'xs': 'blur-sm', 'sm': 'blur', 'md': 'blur-md', 'lg': 'blur-lg', 
    'xl': 'blur-xl', '2xl': 'blur-2xl', '3xl': 'blur-3xl'
  };
  
  backdropClasses = {
    'xs': 'backdrop-blur-sm bg-white/30', 
    'sm': 'backdrop-blur bg-white/30', 
    'md': 'backdrop-blur-md bg-white/30', 
    'lg': 'backdrop-blur-lg bg-white/30', 
    'xl': 'backdrop-blur-xl bg-white/30', 
    '2xl': 'backdrop-blur-2xl bg-white/30', 
    '3xl': 'backdrop-blur-3xl bg-white/30'
  };
}
