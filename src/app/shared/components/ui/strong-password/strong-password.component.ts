import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-strong-password',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full">
      <!-- Input Field -->
      <div class="relative flex items-center w-full border border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-brand-magenta focus-within:border-brand-magenta bg-white overflow-hidden">
        <input 
          [type]="isVisible ? 'text' : 'password'" 
          placeholder="Enter password"
          [value]="value"
          (input)="onInput($event)"
          class="w-full h-10 px-3 text-sm outline-none" />
        <button (click)="isVisible = !isVisible" class="px-3 text-gray-400 hover:text-gray-600 focus:outline-none">
          <!-- Eye Icon -->
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
        </button>
      </div>

      <!-- Strength Bars -->
      <div class="flex gap-1.5 mt-2">
        <div *ngFor="let _ of [1,2,3,4,5]; let i = index" 
             class="h-1.5 flex-1 rounded-full transition-colors duration-300"
             [ngClass]="i < score ? colorMap[score] : 'bg-gray-200'"></div>
      </div>

      <!-- Requirements Popover / Hint -->
      <div class="mt-3 bg-white p-3 border border-gray-100 rounded-lg shadow-sm">
        <p class="text-xs font-semibold text-gray-900 mb-2">Level: <span [ngClass]="textMap[score]">{{ levelText }}</span></p>
        <p class="text-xs font-semibold text-gray-700 mb-1">Your password must contain:</p>
        <ul class="text-xs space-y-1">
          <li class="flex items-center gap-1.5" [ngClass]="reqs.length ? 'text-green-600' : 'text-gray-500'">
            <span>{{ reqs.length ? '✓' : '✕' }}</span> Minimum number of characters is 6.
          </li>
          <li class="flex items-center gap-1.5" [ngClass]="reqs.lower ? 'text-green-600' : 'text-gray-500'">
            <span>{{ reqs.lower ? '✓' : '✕' }}</span> Should contain lowercase.
          </li>
          <li class="flex items-center gap-1.5" [ngClass]="reqs.upper ? 'text-green-600' : 'text-gray-500'">
            <span>{{ reqs.upper ? '✓' : '✕' }}</span> Should contain uppercase.
          </li>
          <li class="flex items-center gap-1.5" [ngClass]="reqs.number ? 'text-green-600' : 'text-gray-500'">
            <span>{{ reqs.number ? '✓' : '✕' }}</span> Should contain numbers.
          </li>
          <li class="flex items-center gap-1.5" [ngClass]="reqs.special ? 'text-green-600' : 'text-gray-500'">
            <span>{{ reqs.special ? '✓' : '✕' }}</span> Should contain special characters.
          </li>
        </ul>
      </div>
    </div>
  `
})
export class StrongPasswordComponent {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  isVisible = false;
  score = 0;
  levelText = 'Empty';
  
  reqs = { length: false, lower: false, upper: false, number: false, special: false };
  colorMap: Record<number, string> = { 1: 'bg-brand-red', 2: 'bg-yellow-400', 3: 'bg-blue-500', 4: 'bg-brand-magenta', 5: 'bg-green-600' };
  textMap: Record<number, string> = { 0: 'text-gray-500', 1: 'text-brand-red', 2: 'text-yellow-600', 3: 'text-blue-600', 4: 'text-brand-magenta', 5: 'text-green-600' };

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.evaluateStrength();
    this.valueChange.emit(this.value);
  }

  evaluateStrength() {
    this.reqs.length = this.value.length >= 6;
    this.reqs.lower = /[a-z]/.test(this.value);
    this.reqs.upper = /[A-Z]/.test(this.value);
    this.reqs.number = /[0-9]/.test(this.value);
    this.reqs.special = /[^A-Za-z0-9]/.test(this.value);

    this.score = Object.values(this.reqs).filter(Boolean).length;
    
    if (this.score === 0) this.levelText = 'Empty';
    else if (this.score <= 2) this.levelText = 'Weak';
    else if (this.score <= 4) this.levelText = 'Medium';
    else this.levelText = 'Strong';
  }
}
