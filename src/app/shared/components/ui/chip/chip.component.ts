import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="[
      'inline-flex items-center gap-1.5 rounded-full font-medium transition-colors border',
      sizeClasses[size],
      typeClasses[type]
    ]">
      <span class="w-1.5 h-1.5 rounded-full currentColor opacity-70 bg-current"></span>
      <span>{{ label }}</span>
      <button *ngIf="dismissible" (click)="onDismiss.emit()" class="ml-1 opacity-60 hover:opacity-100 focus:outline-none">
        ✕
      </button>
    </div>
  `
})
export class ChipComponent {
  @Input() label: string = 'Chip';
  @Input() type: 'default' | 'success' | 'failed' | 'neutral' = 'default';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() dismissible: boolean = true;
  @Output() onDismiss = new EventEmitter<void>();

  sizeClasses = { 'sm': 'px-2 py-0.5 text-xs', 'md': 'px-3 py-1 text-sm', 'lg': 'px-4 py-1.5 text-base' };
  
  // Mapping precisely to the rules: Maroon/Magenta (Default), Green (Success), Red (Failed), Yellow (Neutral)
  typeClasses = {
    'default': 'bg-brand-magenta text-white border-brand-magenta',
    'success': 'bg-green-500 text-white border-green-600',
    'failed': 'bg-brand-red text-white border-brand-red',
    'neutral': 'bg-yellow-500 text-white border-yellow-600'
  };
}
