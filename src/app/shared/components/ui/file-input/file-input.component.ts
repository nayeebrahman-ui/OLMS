import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center w-full">
      <input type="file" #fileInput class="hidden" (change)="onFileSelected($event)" [disabled]="disabled">
      
      <!-- Input Style -->
      <div *ngIf="variant === 'input'" 
           class="flex w-full overflow-hidden border rounded-md border-gray-300 focus-within:ring-1 focus-within:ring-brand-magenta focus-within:border-brand-magenta"
           [ngClass]="[sizeClasses[size], disabled ? 'opacity-50 cursor-not-allowed' : '']">
        <button type="button" (click)="fileInput.click()" [disabled]="disabled"
                class="px-4 font-medium text-gray-700 bg-gray-50 border-r border-gray-300 hover:bg-gray-100 transition-colors">
          Choose file
        </button>
        <div class="flex-1 px-3 flex items-center text-gray-500 bg-white overflow-hidden text-ellipsis whitespace-nowrap">
          {{ fileName || 'No file chosen' }}
        </div>
      </div>

      <!-- Button Style -->
      <div *ngIf="variant === 'button'" class="flex items-center gap-3">
        <ng-content select="[avatar]"></ng-content>
        <button type="button" (click)="fileInput.click()" [disabled]="disabled"
                class="px-4 py-2 text-sm font-medium text-white bg-brand-magenta rounded-md hover:bg-brand-magenta/90 shadow-sm transition-all disabled:opacity-50">
          {{ buttonText }}
        </button>
        <span *ngIf="!hasCustomActions" class="text-sm text-gray-500">{{ fileName || 'No file chosen' }}</span>
        <ng-content select="[actions]"></ng-content>
      </div>
    </div>
  `
})
export class FileInputComponent {
  @Input() variant: 'input' | 'button' = 'input';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled: boolean = false;
  @Input() buttonText: string = 'Upload file';
  @Input() hasCustomActions: boolean = false;
  @Output() fileSelected = new EventEmitter<File>();
  
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  fileName: string = '';

  sizeClasses = { 'sm': 'h-8 text-xs', 'md': 'h-10 text-sm', 'lg': 'h-12 text-base' };

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.fileName = file.name;
      this.fileSelected.emit(file);
    }
  }
}
