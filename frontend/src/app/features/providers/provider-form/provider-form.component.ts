import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProviderService } from '../../../core/services/provider.service';

@Component({
  selector: 'app-provider-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './provider-form.component.html',
  styleUrl: './provider-form.component.css'
})
export class ProviderFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  providerId: number | null = null;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private providerService: ProviderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.providerId = +id;
      this.loadProvider();
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      contactEmail: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      isActive: [true]
    });
  }

  loadProvider(): void {
    this.loading = true;
    this.providerService.getById(this.providerId!).subscribe({
      next: (provider) => {
        this.form.patchValue(provider);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar proveedor';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const data = this.form.value;

    const request = this.isEditMode
      ? this.providerService.update(this.providerId!, data)
      : this.providerService.create(data);

    request.subscribe({
      next: () => this.router.navigate(['/providers']),
      error: (err) => {
        this.error = err.error?.message || 'Error al guardar proveedor';
        this.loading = false;
        console.error(err);
      }
    });
  }
}