import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardComponent, CardBodyComponent, CardFooterComponent } from '../../../shared/components/ui/card/card.component';
import { InputComponent } from '../../../shared/components/ui/input/input.component';
import { CheckboxComponent } from '../../../shared/components/ui/checkbox/checkbox.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { DividerComponent } from '../../../shared/components/ui/divider/divider.component';
import { AlertComponent } from '../../../shared/components/ui/alert/alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, CardComponent, CardBodyComponent, CardFooterComponent,
    InputComponent, CheckboxComponent, ButtonComponent, DividerComponent, AlertComponent
  ],
  template: `
    <div class="min-h-screen w-full flex items-center justify-center p-4 bg-gray-50">
      <div class="w-full max-w-[400px]">
        
        <div class="flex justify-center mb-8">
          <div class="flex items-center gap-2">
            <span class="text-3xl font-bold tracking-tight text-brand-neutralBlack">brac</span>
            <span class="text-3xl font-bold tracking-tight text-brand-magenta border-l-2 border-brand-neutralBlack pl-2 leading-none">IT</span>
          </div>
        </div>

        <!-- Error Alert -->
        <app-alert 
          *ngIf="showError" 
          type="failure" 
          appearance="soft" 
          title="Login Failed" 
          message="Invalid Employee ID or Password.">
        </app-alert>
        
        <!-- Success Alert -->
        <app-alert 
          *ngIf="showSuccess" 
          type="success" 
          appearance="soft" 
          title="Login Successful" 
          message="Welcome back! Redirecting...">
        </app-alert>

        <app-card class="mt-4">
          <app-card-body class="pt-8">
            <div class="mb-6 text-center">
              <h1 class="text-xl font-semibold text-gray-900">Sign in to your account</h1>
              <p class="text-sm text-gray-500 mt-1">Use ID: <strong class="text-gray-800">brac-admin</strong> | Pass: <strong class="text-gray-800">Password123!</strong></p>
            </div>

            <form (ngSubmit)="onLogin()" class="flex flex-col gap-4">
              <app-input 
                type="text" 
                label="Employee ID / Email" 
                placeholder="Enter your ID or email"
                [value]="credentials.id"
                (valueChange)="credentials.id = $event">
              </app-input>

              <app-input 
                type="password" 
                label="Password" 
                placeholder="Enter your password"
                [value]="credentials.password"
                (valueChange)="credentials.password = $event">
              </app-input>

              <div class="flex items-center justify-between mt-1">
                <app-checkbox 
                  label="Remember me" 
                  [checked]="credentials.rememberMe"
                  (checkedChange)="credentials.rememberMe = $event">
                </app-checkbox>
                <a href="/forgot-password" class="text-sm font-medium text-brand-magenta hover:underline">Forgot password?</a>
              </div>

              <app-button variant="solid" size="lg" class="w-full mt-2" type="submit">Sign In</app-button>
            </form>

            <app-divider variant="solid" weight="light" class="my-6">
              <span class="bg-white px-2 text-xs text-gray-400 font-medium absolute left-1/2 -translate-x-1/2 -mt-2">OR CONTINUE WITH</span>
            </app-divider>

            <div class="flex flex-col gap-3">
              <app-button variant="outline" size="md" class="w-full">
                <span left-icon class="mr-2 font-bold text-brand-magenta">B</span> BRAC SSO
              </app-button>
              <div class="flex gap-3">
                <app-button variant="outline" size="md" class="w-full flex-1">Gmail</app-button>
                <app-button variant="outline" size="md" class="w-full flex-1">Facebook</app-button>
              </div>
            </div>
          </app-card-body>
          
          <app-card-footer>
            <div class="w-full text-center py-2">
              <span class="text-gray-500">By continuing, you agree to our </span>
              <a href="/terms" class="text-brand-magenta hover:underline font-medium">Terms & Conditions</a>
            </div>
          </app-card-footer>
        </app-card>
      </div>
    </div>
  `
})
export class LoginComponent {
  credentials = { id: '', password: '', rememberMe: false };
  showError = false;
  showSuccess = false;

  onLogin() {
    this.showError = false;
    this.showSuccess = false;

    // Hardcoded credential check
    if (this.credentials.id === 'brac-admin' && this.credentials.password === 'Password123!') {
      this.showSuccess = true;
      console.log('Login successful');
      // Typically you would inject Router here: this.router.navigate(['/dashboard'])
    } else {
      this.showError = true;
    }
  }
}
