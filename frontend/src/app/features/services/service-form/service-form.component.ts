import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceService } from '../../../core/services/service.service';
import { ProviderService } from '../../../core/services/provider.service';
import { Provider } from '../../../core/models/provider';

@Component({
  selector: 'app-service-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './service-form.component.html',
  styleUrl: './service-form.component.css'
})
export class ServiceFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  serviceId: number | null = null;
  loading = false;
  error = '';
  providers: Provider[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceService: ServiceService,
    private providerService: ProviderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProviders();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.serviceId = +id;
      this.loadService();
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      providerId: ['', [Validators.required]],
      isActive: [true]
    });
  }

  loadProviders(): void {
    this.providerService.getAll().subscribe({
      next: (data) => this.providers = data,
      error: (err) => console.error('Error al cargar proveedores', err)
    });
  }

  loadService(): void {
    this.loading = true;
    this.serviceService.getById(this.serviceId!).subscribe({
      next: (service) => {
        this.form.patchValue({
          name: service.name,
          description: service.description,
          providerId: service.providerId || service.provider?.id,
          isActive: service.isActive
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar servicio';
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
      ? this.serviceService.update(this.serviceId!, data)
      : this.serviceService.create(data);

    request.subscribe({
      next: () => this.router.navigate(['/services']),
      error: (err) => {
        this.error = err.error?.message || 'Error al guardar servicio';
        this.loading = false;
        console.error(err);
      }
    });
  }
}