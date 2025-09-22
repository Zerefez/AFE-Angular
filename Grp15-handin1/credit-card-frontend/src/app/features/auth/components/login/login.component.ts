import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, CreateGroupDto, LoginDto } from '../../../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  showCreateGroup = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  loginForm: FormGroup;
  groupForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['1234', [Validators.required]]
    });

    this.groupForm = this.fb.group({
      prefix: ['', [Validators.required, Validators.minLength(1)]],
      groupNumber: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onCreateGroup() {
    if (this.groupForm.valid) {
      this.loading.set(true);
      this.error.set(null);

      const groupData: CreateGroupDto = this.groupForm.value;

      this.authService.createGroup(groupData).subscribe({
        next: () => {
          alert('Group created successfully! You can now login with your credentials.');
          this.showCreateGroup.set(false);
          this.loginForm.patchValue({
            username: `${groupData.prefix}@bank.dk`
          });
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set('Failed to create group. Please try again.');
          this.loading.set(false);
          console.error('Error creating group:', error);
        }
      });
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.error.set(null);

      const credentials: LoginDto = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.error.set('Invalid credentials. Please try again.');
          this.loading.set(false);
          console.error('Login error:', error);
        }
      });
    }
  }
}
