import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FileProgress { name: string; size: string; progress: number; status: 'uploading' | 'completed' | 'error'; }

@Component({
  selector: 'app-file-upload-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4 bg-white border border-gray-200 rounded-lg shadow-sm w-full mb-3">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-3 overflow-hidden">
          <div class="w-8 h-8 rounded bg-gray-100 flex items-center justify-center shrink-0">
             <!-- File Icon Placeholder -->
             <svg class="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"></path></svg>
          </div>
          <div class="truncate">
            <p class="text-sm font-semibold text-gray-900 truncate">{{ file.name }}</p>
            <p class="text-xs text-gray-500">{{ file.size }}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-2 text-gray-400">
          <button *ngIf="file.status === 'uploading'" class="hover:text-gray-700"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>
          <button *ngIf="file.status === 'completed'" class="text-green-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></button>
          <button *ngIf="file.status === 'error'" class="text-brand-red"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></button>
          <button (click)="onDelete.emit()" class="hover:text-brand-red"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
        </div>
      </div>
      
      <div class="flex items-center gap-3">
        <div class="w-full bg-gray-200 rounded-full h-1.5">
          <div class="h-1.5 rounded-full transition-all duration-300"
               [ngClass]="file.status === 'error' ? 'bg-brand-red' : 'bg-brand-magenta'"
               [style.width.%]="file.progress"></div>
        </div>
        <span class="text-xs font-medium text-gray-700 min-w-[32px]">{{ file.progress }}%</span>
      </div>
    </div>
  `
})
export class FileUploadProgressComponent {
  @Input() file!: FileProgress;
  @Output() onDelete = new EventEmitter<void>();
}
