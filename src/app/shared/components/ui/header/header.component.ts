import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="w-full bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div class="flex items-center gap-8">
        <div class="flex items-center gap-2 cursor-pointer">
           <ng-content select="[brand-logo]"></ng-content>
        </div>
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
           <ng-content select="[nav-links]"></ng-content>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <!-- Search Icon Placeholder -->
        <button class="text-gray-500 hover:text-brand-magenta transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
        <ng-content select="[actions]"></ng-content>
      </div>
    </header>
  `
})
export class HeaderComponent {}
