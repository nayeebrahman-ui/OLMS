import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col gap-1.5 w-full">
      <div *ngIf="label || secondaryLabel" class="flex justify-between items-center text-sm">
        <label *ngIf="label" class="font-medium text-gray-700">{{ label }}</label>
        <span *ngIf="secondaryLabel" class="text-gray-500 text-xs">{{ secondaryLabel }}</span>
      </div>
      
      <div class="relative flex items-center">
        <!-- Prefix Content -->
        <div *ngIf="hasPrefix" class="absolute left-3 text-gray-400">
          <ng-content select="[prefix]"></ng-content>
        </div>
        
        <input 
          [type]="isPasswordVisible ? 'text' : type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          (input)="onInput($event)"
          class="w-full transition-all text-sm outline-none bg-white placeholder:text-gray-400 disabled:opacity-50 disabled:bg-gray-50 disabled:cursor-not-allowed"
          [ngClass]="[
            sizeClasses[size],
            shapeClasses[shape],
            variantClasses[variant],
            hasPrefix ? 'pl-9' : '',
            hasSuffix || type === 'password' ? 'pr-10' : '',
            error ? '!border-brand-red focus:!ring-brand-red text-brand-red' : '',
            success ? '!border-green-500 focus:!ring-green-500 text-green-700' : ''
          ]" />
          
        <!-- Password Toggle -->
        <button *ngIf="type === 'password'" 
                type="button" 
                (click)="togglePassword()" 
                class="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none">
           <svg *ngIf="!isPasswordVisible" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
           <svg *ngIf="isPasswordVisible" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
        </button>

        <!-- Suffix Content -->
        <div *ngIf="hasSuffix && type !== 'password'" class="absolute right-3 text-gray-400">
          <ng-content select="[suffix]"></ng-content>
        </div>
      </div>

      <p *ngIf="feedbackMessage" 
         class="text-xs mt-0.5"
         [ngClass]="error ? 'text-brand-red' : success ? 'text-green-600' : 'text-gray-500'">
        {{ feedbackMessage }}
      </p>
    </div>
  `
})
export class InputComponent {
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() label?: string;
  @Input() secondaryLabel?: string;
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() feedbackMessage?: string;
  @Input() error: boolean = false;
  @Input() success: boolean = false;
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() shape: 'rounded' | 'pilled' = 'rounded';
  @Input() variant: 'bordered' | 'underline' | 'light' = 'bordered';
  @Input() hasPrefix: boolean = false;
  @Input() hasSuffix: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  isPasswordVisible = false;

  sizeClasses = { 'sm': 'h-8 px-3', 'md': 'h-10 px-3', 'lg': 'h-12 px-4 text-base' };
  shapeClasses = { 'rounded': 'rounded-md', 'pilled': 'rounded-full' };
  variantClasses = {
    'bordered': 'border border-gray-300 focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta',
    'underline': 'border-0 border-b-2 border-gray-200 !rounded-none focus:border-brand-magenta !px-0 bg-transparent',
    'light': 'border-transparent bg-gray-100 focus:bg-white focus:border-brand-magenta focus:ring-1 focus:ring-brand-magenta'
  };

  togglePassword() { this.isPasswordVisible = !this.isPasswordVisible; }
  onInput(event: Event) { this.valueChange.emit((event.target as HTMLInputElement).value); }
}
