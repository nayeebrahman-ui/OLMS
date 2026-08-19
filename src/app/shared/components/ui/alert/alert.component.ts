import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="[
      'flex items-start justify-between p-4 rounded-lg mb-3 shadow-sm',
      styleMap[type][appearance]
    ]">
      <div class="flex items-center gap-3">
        <div class="p-1 rounded-full bg-white/20">✓</div>
        <div>
          <h4 class="font-semibold text-sm">{{ title }}</h4>
          <p class="text-xs opacity-90 mt-0.5">{{ message }}</p>
        </div>
      </div>
      <button class="opacity-70 hover:opacity-100 transition-opacity">✕</button>
    </div>
  `
})
export class AlertComponent {
  @Input() type: 'general' | 'success' | 'failure' | 'neutral' = 'general';
  @Input() appearance: 'solid' | 'soft' = 'solid';
  @Input() title: string = 'Alert Message';
  @Input() message: string = 'This is an alert description.';

  // general maps to your Maroon/Magenta brand color
  styleMap = {
    general: { solid: 'bg-brand-magenta text-white', soft: 'bg-brand-magenta/10 text-brand-magenta' },
    success: { solid: 'bg-green-600 text-white', soft: 'bg-green-100 text-green-700' },
    failure: { solid: 'bg-brand-red text-white', soft: 'bg-brand-red/10 text-brand-red' },
    neutral: { solid: 'bg-yellow-500 text-white', soft: 'bg-yellow-100 text-yellow-700' }
  };
}
