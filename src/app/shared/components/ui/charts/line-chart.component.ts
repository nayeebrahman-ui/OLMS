import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full h-64 relative flex flex-col group cursor-crosshair">
      <!-- Grid -->
      <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
        <div *ngFor="let _ of [1,2,3,4,5]" class="w-full border-t border-gray-100"></div>
      </div>
      
      <svg class="w-full h-full absolute inset-0 z-10 preserve-3d" viewBox="0 0 100 100" preserveAspectRatio="none">
        <!-- Gradient Fill -->
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#D10074" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#D10074" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path *ngIf="showGradient" [attr.d]="fillPath" fill="url(#lineGrad)" />
        
        <!-- Line Path -->
        <path [attr.d]="svgPath" fill="none" stroke="#D10074" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        
        <!-- Data Points -->
        <circle *ngFor="let pt of normalizedPoints" 
                [attr.cx]="pt.x" [attr.cy]="pt.y" 
                r="1.5" fill="white" stroke="#D10074" stroke-width="1"
                class="opacity-0 group-hover:opacity-100 transition-opacity hover:r-3 hover:stroke-2" />
      </svg>
      
      <!-- X Axis -->
      <div class="absolute bottom-0 w-full flex justify-between pt-2 border-t border-gray-200 text-[10px] text-gray-400 translate-y-full">
        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
      </div>
    </div>
  `
})
export class LineChartComponent {
  @Input() data: number[] = [20, 50, 30, 80, 40, 70, 50, 60];
  @Input() showGradient: boolean = true;

  get normalizedPoints() {
    const max = Math.max(...this.data, 100);
    const stepX = 100 / (this.data.length - 1);
    return this.data.map((val, i) => ({
      x: i * stepX,
      y: 100 - (val / max) * 100
    }));
  }

  get svgPath() {
    const pts = this.normalizedPoints;
    if (pts.length === 0) return '';
    // Generate smooth bezier curve path
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const cx = (pts[i].x + pts[i+1].x) / 2;
      d += ` C ${cx} ${pts[i].y}, ${cx} ${pts[i+1].y}, ${pts[i+1].x} ${pts[i+1].y}`;
    }
    return d;
  }

  get fillPath() {
    const path = this.svgPath;
    return `${path} L 100 100 L 0 100 Z`;
  }
}
