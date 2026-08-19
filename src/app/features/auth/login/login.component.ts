import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import your custom UI components here. Adjust paths relative to your structure.
import { 
  CardComponent, 
  CardBodyComponent, 
  CardFooterComponent 
} from '../../../shared/components/ui/card/card.component';
import { InputComponent } from '../../../shared/components/ui/input/input.component';
import { CheckboxComponent } from '../../../shared/components/ui/checkbox/checkbox.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { DividerComponent } from '../../../shared/components/ui/divider/divider.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardBodyComponent,
    CardFooterComponent,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    DividerComponent
  ],
  template: `
    <div class="min-h-screen w-full flex items-center justify-center p-4 bg-gray-50">
      
      <!-- Max width 400px is standard for single-column auth flows -->
      <div class="w-full max-w-[400px]">
        
        <!-- Brand Logo Area -->
        <div class="flex justify-center mb-8">
          <div class="flex items-center gap-2">
            <span class="text-3xl font-bold tracking-tight text-brand-neutralBlack">brac</span>
            <span class="text-3xl font-bold tracking-tight text-brand-magenta border-l-2 border-brand-neutralBlack pl-2 leading-none">IT</span>
          </div>
        </div>

        <app-card>
          <app-card-body class="pt-8">
            <div class="mb-6 text-center">
              <h1 class="text-xl font-semibold text-gray-900">Sign in to your account</h1>
              <p class="text-sm text-gray-500 mt-1">Enter your details to access the portal</p>
            </div>

            <!-- Standard Auth Form -->
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
                <a href="/forgot-password" class="text-sm font-medium text-brand-magenta hover:underline focus:outline-none">
                  Forgot password?
                </a>
              </div>

              <app-button variant="solid" size="lg" class="w-full mt-2" type="submit">
                Sign In
              </app-button>
            </form>

            <app-divider variant="solid" weight="light" class="my-6">
              <span class="bg-white px-2 text-xs text-gray-400 font-medium absolute left-1/2 -translate-x-1/2 -mt-2">
                OR CONTINUE WITH
              </span>
            </app-divider>

            <!-- SSO Options -->
            <div class="flex flex-col gap-3">
              <app-button variant="outline" size="md" class="w-full" (click)="loginWith('BRAC_SSO')">
                <span left-icon class="mr-2 font-bold text-brand-magenta">B</span>
                BRAC SSO
              </app-button>

              <div class="flex gap-3">
                <app-button variant="outline" size="md" class="w-full flex-1" (click)="loginWith('GMAIL')">
                  <svg left-icon class="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Gmail
                </app-button>

                <app-button variant="outline" size="md" class="w-full flex-1" (click)="loginWith('FACEBOOK')">
                  <svg left-icon class="w-4 h-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </app-button>
              </div>
            </div>
          </app-card-body>
          
          <app-card-footer>
            <div class="w-full text-center py-2">
              <span class="text-gray-500">By continuing, you agree to our </span>
              <a href="/terms" class="text-brand-magenta hover:underline font-medium focus:outline-none">Terms & Conditions</a>
            </div>
          </app-card-footer>
        </app-card>
      </div>
    </div>
  `
})
export class LoginComponent {
  credentials = {
    id: '',
    password: '',
    rememberMe: false
  };

  onLogin() {
    console.log('Standard Login Initiated', this.credentials);
    // Connect to your auth service here
  }

  loginWith(provider: 'BRAC_SSO' | 'GMAIL' | 'FACEBOOK') {
    console.log(`Initiating SSO with ${provider}`);
    // Connect to your OAuth/OIDC interceptors here
  }
}
