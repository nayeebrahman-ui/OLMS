import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Step { title: string; description?: string; status: 'complete' | 'current' | 'upcoming' | 'error'; }

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center w-full">
      @for (step of steps; track $index; let last = $last) {
        <div class="flex flex-col items-center relative flex-1">
          <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium z-10"
               [ngClass]="{
                 'bg-blue-600 text-white': step.status === 'complete' || step.status === 'current',
                 'bg-red-500 text-white': step.status === 'error',
                 'bg-gray-200 text-gray-500': step.status === 'upcoming'
               }">
            {{ step.status === 'complete' ? '✓' : step.status === 'error' ? '✕' : $index + 1 }}
          </div>
          <div class="mt-2 text-center">
            <p class="text-sm font-semibold text-gray-900">{{ step.title }}</p>
            @if (step.description) { <p class="text-xs text-gray-500">{{ step.description }}</p> }
          </div>
          @if (!last) {
            <div class="absolute top-4 left-[50%] w-full h-[2px] -z-0"
                 [ngClass]="step.status === 'complete' ? 'bg-blue-600' : 'bg-gray-200'"></div>
          }
        </div>
      }
    </div>
  `
})
export class StepperComponent {
  @Input() steps: Step[] = [];
}
