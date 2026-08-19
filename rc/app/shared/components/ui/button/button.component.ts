import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [disabled]="disabled"
      [ngClass]="[
        'inline-flex items-center justify-center font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2',
        shapeClasses[shape],
        sizeClasses[size],
        variantClasses[variant],
        disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.98]'
      ]">
      <ng-content select="[left-icon]"></ng-content>
      <span class="mx-2"><ng-content></ng-content></span>
      <ng-content select="[right-icon]"></ng-content>
    </button>
  `
})
export class ButtonComponent {
  @Input() variant: 'solid' | 'outline' | 'soft' | 'white' = 'solid';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() shape: 'rounded' | 'pilled' = 'rounded';
  @Input() disabled: boolean = false;

  shapeClasses = { 'rounded': 'rounded-lg', 'pilled': 'rounded-full' };
  sizeClasses = { 'sm': 'h-8 px-3 text-xs', 'md': 'h-10 px-4 text-sm', 'lg': 'h-12 px-6 text-base' };
  
  // Utilizes your primary Magenta brand color for the main interactive states
  variantClasses = {
    'solid': 'bg-brand-magenta text-white hover:bg-brand-magenta/90 focus:ring-brand-magenta/50 shadow-sm',
    'outline': 'border-2 border-brand-magenta text-brand-magenta hover:bg-brand-magenta/5 focus:ring-brand-magenta/50',
    'soft': 'bg-brand-magenta/10 text-brand-magenta hover:bg-brand-magenta/20 focus:ring-brand-magenta/30',
    'white': 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 focus:ring-gray-200'
  };
}

@Component({
  selector: 'app-button-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="inline-flex rounded-md shadow-sm overflow-hidden border border-brand-magenta" role="group">
      <ng-content></ng-content>
    </div>
  `
})
export class ButtonGroupComponent {}
