import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-stretch w-full shadow-sm rounded-md overflow-hidden">
      <!-- 
        By stripping the border radius and left-margins from middle/trailing elements, 
        we create the seamless "Trailed Button Add-on" or "Multiple Input" look from Image 9. 
      -->
      <div class="flex w-full [&>*:not(:first-child)]:!rounded-l-none [&>*:not(:first-child)]:-ml-px [&>*:not(:last-child)]:!rounded-r-none">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class InputGroupComponent {}
