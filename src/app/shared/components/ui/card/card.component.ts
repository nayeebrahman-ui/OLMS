import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `<div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col"><ng-content></ng-content></div>`
})
export class CardComponent {}

@Component({
  selector: 'app-card-image',
  standalone: true,
  template: `<div class="w-full h-48 bg-gray-100 overflow-hidden"><ng-content></ng-content></div>`
})
export class CardImageComponent {}

@Component({
  selector: 'app-card-body',
  standalone: true,
  template: `<div class="p-5 flex-1"><ng-content></ng-content></div>`
})
export class CardBodyComponent {}

@Component({
  selector: 'app-card-footer',
  standalone: true,
  template: `<div class="px-5 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500"><ng-content></ng-content></div>`
})
export class CardFooterComponent {}
