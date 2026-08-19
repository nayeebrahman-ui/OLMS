import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputComponent } from '../../../shared/components/ui/input/input.component';
import { CheckboxComponent } from '../../../shared/components/ui/checkbox/checkbox.component';
import { ButtonComponent } from '../../../shared/components/ui/button/button.component';
import { DividerComponent } from '../../../shared/components/ui/divider/divider.component';
import { AlertComponent } from '../../../shared/components/ui/alert/alert.component';
import { ModalComponent } from '../../../shared/components/ui/modal/modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    DividerComponent,
    AlertComponent,
    ModalComponent
  ],
  template: `
    <!-- Background Image Implementation -->
    <div class="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
         style="background-image: url('/login-bg.png');">
      
      <!-- Subtle tint overlay so the white glassmorphism pops against the pink background -->
      <div class="absolute inset-0 bg-black/5 pointer-events-none"></div>

      <!-- TRUE Glassmorphic Card Container -->
      <div class="relative w-full max-w-[420px] rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] p-8 transition-all flex flex-col items-center">
        
        <!-- Official BRAC Logo (All Caps) -->
        <div class="flex justify-center mb-6">
          <span class="text-5xl font-black text-brand-magenta tracking-tighter uppercase">BRAC</span>
        </div>
        
        <!-- Centered Header - Fixed Font Weight -->
        <div class="text-center w-full mb-6 flex flex-col items-center">
          <h1 class="text-2xl font-bold text-gray-900 text-center">Sign In</h1>
          <p class="text-xs text-gray-700 mt-1 text-center font-medium">Enter your credentials to access the portal</p>
        </div>

        <!-- Feedback Alerts -->
        <div class="w-full">
          <app-alert *ngIf="showError" type="failure" appearance="soft" title="Login Failed" message="Invalid Employee ID or Password."></app-alert>
          <app-alert *ngIf="showSuccess" type="success" appearance="soft" title="Welcome Back" message="Authentication verified. Redirecting..."></app-alert>
          <app-alert *ngIf="forgotPasswordSuccess" type="success" appearance="soft" title="Reset Link Sent" message="Check your inbox for password recovery instructions."></app-alert>
        </div>

        <!-- Standard Login Form -->
        <form (ngSubmit)="onLogin()" class="flex flex-col gap-4 mt-2 w-full items-center">
          <div class="w-full">
            <app-input type="text" label="Employee ID / Email" placeholder="Enter your ID or email" [value]="credentials.id" (valueChange)="credentials.id = $event"></app-input>
          </div>

          <div class="w-full">
            <app-input type="password" label="Password" placeholder="Enter your password" [value]="credentials.password" (valueChange)="credentials.password = $event"></app-input>
          </div>

          <div class="flex items-center justify-between mt-0.5 text-xs w-full">
            <app-checkbox label="Remember me" [checked]="credentials.rememberMe" (checkedChange)="credentials.rememberMe = $event"></app-checkbox>
            
            <button type="button" (click)="isForgotPasswordOpen = true" class="font-bold text-brand-magenta hover:underline focus:outline-none cursor-pointer">
              Forgot password?
            </button>
          </div>

          <!-- Centered Button -->
          <app-button variant="solid" size="lg" class="w-full mt-2 !bg-brand-magenta hover:!bg-brand-magenta/90 text-white font-bold shadow-md cursor-pointer flex justify-center items-center text-center" type="submit">
            Sign In
          </app-button>
        </form>

        <!-- Divider with Glassmorphic Label -->
        <div class="relative my-6 flex items-center justify-center w-full">
          <div class="border-t border-gray-400/40 w-full"></div>
          <span class="px-3 py-0.5 text-[11px] font-bold text-gray-700 uppercase tracking-wider absolute rounded bg-white/50 backdrop-blur-sm">
            Or connect with
          </span>
        </div>

        <!-- Social SSO Logo Buttons -->
        <div class="flex items-center justify-center gap-4 w-full">
          <!-- BRAC SSO Icon -->
          <button type="button" (click)="loginWith('BRAC_SSO')" title="Sign in with BRAC SSO" class="w-12 h-12 rounded-xl bg-white/60 border border-white/50 shadow-sm flex items-center justify-center hover:bg-white/90 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md transition-all">
            <span class="text-xl font-black text-brand-magenta">B</span>
          </button>

          <!-- Gmail Icon -->
          <button type="button" (click)="loginWith('GMAIL')" title="Sign in with Google" class="w-12 h-12 rounded-xl bg-white/60 border border-white/50 shadow-sm flex items-center justify-center hover:bg-white/90 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md transition-all">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </button>

          <!-- Facebook Icon -->
          <button type="button" (click)="loginWith('FACEBOOK')" title="Sign in with Facebook" class="w-12 h-12 rounded-xl bg-white/60 border border-white/50 shadow-sm flex items-center justify-center hover:bg-white/90 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md transition-all">
            <svg class="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
        </div>

        <!-- Footer Terms & Conditions Trigger -->
        <div class="mt-6 text-center text-xs text-gray-800 font-medium w-full flex flex-col items-center">
          <span>By signing in, you agree to our</span>
          <button type="button" (click)="isTermsOpen = true" class="text-brand-magenta font-bold underline hover:text-brand-magenta/80 focus:outline-none cursor-pointer mt-0.5">
            Terms & Conditions
          </button>
        </div>

      </div>

      <!-- ================= TERMS & CONDITIONS POPUP MODAL ================= -->
      <app-modal [isOpen]="isTermsOpen" size="md" title="Terms & Conditions" description="Enterprise Portal Policy" (close)="isTermsOpen = false">
        <div modal-body class="space-y-3 text-xs text-gray-600 max-h-72 overflow-y-auto pr-1">
          <p class="font-bold text-gray-800 text-left">1. Acceptance of Terms</p>
          <p class="text-left">By accessing or utilizing the OneLMS software platform, authorized personnel and authenticated users agree to comply with organizational policies, confidentiality mandates, and data protection guidelines.</p>
          
          <p class="font-bold text-gray-800 text-left mt-4">2. Security & Compliance</p>
          <p class="text-left">Users must safeguard credentials and refrain from unauthorized credential sharing. All user activities and transaction logs within this system are securely recorded and monitored for compliance audits.</p>
          
          <p class="font-bold text-gray-800 text-left mt-4">3. Privacy and Data Governance</p>
          <p class="text-left">Personal and project records are strictly governed in accordance with enterprise data protection standards.</p>

          <div class="pt-4 mt-2 border-t border-gray-200">
            <app-checkbox label="I have read and agree to the Terms & Conditions" [checked]="termsAccepted" (checkedChange)="termsAccepted = $event"></app-checkbox>
          </div>
        </div>

        <div modal-footer class="flex justify-end gap-2 w-full">
          <app-button variant="white" size="sm" (click)="isTermsOpen = false" class="flex justify-center items-center text-center font-bold">Close</app-button>
          <app-button variant="solid" size="sm" [disabled]="!termsAccepted" (click)="isTermsOpen = false" class="flex justify-center items-center text-center font-bold">
            Accept & Continue
          </app-button>
        </div>
      </app-modal>

      <!-- ================= FORGOT PASSWORD POPUP MODAL ================= -->
      <app-modal [isOpen]="isForgotPasswordOpen" size="sm" title="Reset Password" description="We'll send recovery instructions to your registered email." (close)="isForgotPasswordOpen = false">
        <div modal-body class="space-y-4 pt-1">
          <app-input type="email" label="Work Email Address" placeholder="name@brac.net" [value]="forgotEmail" (valueChange)="forgotEmail = $event"></app-input>
        </div>
        <div modal-footer class="flex justify-end gap-2 w-full">
          <app-button variant="white" size="sm" (click)="isForgotPasswordOpen = false" class="flex justify-center items-center text-center font-bold">Cancel</app-button>
          <app-button variant="solid" size="sm" [disabled]="!forgotEmail" (click)="submitForgotPassword()" class="flex justify-center items-center text-center font-bold">
            Send Reset Link
          </app-button>
        </div>
      </app-modal>
    </div>
  `
})
export class LoginComponent {
  credentials = {
    id: '',
    password: '',
    rememberMe: false
  };

  showError = false;
  showSuccess = false;
  
  isTermsOpen = false;
  termsAccepted = false;

  isForgotPasswordOpen = false;
  forgotEmail = '';
  forgotPasswordSuccess = false;

  onLogin() {
    this.showError = false;
    this.showSuccess = false;
    this.forgotPasswordSuccess = false;

    if (this.credentials.id === 'brac-admin' && this.credentials.password === 'Password123!') {
      this.showSuccess = true;
    } else {
      this.showError = true;
    }
  }

  submitForgotPassword() {
    this.isForgotPasswordOpen = false;
    this.forgotPasswordSuccess = true;
  }

  loginWith(provider: 'BRAC_SSO' | 'GMAIL' | 'FACEBOOK') {
    console.log(`Initiating SSO with ${provider}`);
  }
}
