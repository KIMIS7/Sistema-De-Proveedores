import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { RateService } from '../../../core/services/rate.service';
import { ServiceService } from '../../../core/services/service.service';
import { Service } from '../../../core/models/service';

@Component({
  selector: 'app-rate-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './rate-form.component.html',
  styleUrl: './rate-form.component.css'
})
export class RateFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  rateId: number | null = null;
  loading = false;
  error = '';
  
  // Lista de servicios para el dropdown
  services: Service[] = [];
  
  // Opciones de moneda para el select
  currencies = ['USD', 'MXN'];

  constructor(
    private fb: FormBuilder,
    private rateService: RateService,
    private serviceService: ServiceService,  // Para cargar servicios
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadServices();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.rateId = +id;
      this.loadRate();
    }
  }

  // Define los campos del formulario con validaciones
  initForm(): void {
    this.form = this.fb.group({
      price: ['', [Validators.required, Validators.min(0)]],
      currency: ['MXN', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      serviceId: ['', [Validators.required]]
    });
  }

  // Carga los servicios para el dropdown
  loadServices(): void {
    this.serviceService.getAll().subscribe({
      next: (data) => this.services = data,
      error: (err) => console.error('Error al cargar servicios', err)
    });
  }

  // Carga los datos del tarifario (modo edición)
  loadRate(): void {
    this.loading = true;
    
    this.rateService.getById(this.rateId!).subscribe({
      next: (rate) => {
        // Formatea las fechas para el input type="date"
        // El input date espera formato YYYY-MM-DD
        const startDate = new Date(rate.startDate).toISOString().split('T')[0];
        const endDate = new Date(rate.endDate).toISOString().split('T')[0];
        
        this.form.patchValue({
          price: rate.price,
          currency: rate.currency,
          startDate: startDate,
          endDate: endDate,
          serviceId: rate.serviceId || rate.service?.id
        });
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar tarifario';
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
      ? this.rateService.update(this.rateId!, data)
      : this.rateService.create(data);

    request.subscribe({
      next: () => this.router.navigate(['/rates']),
      error: (err) => {
        // El backend puede devolver error si hay overlap de fechas
        this.error = err.error?.message || 'Error al guardar tarifario';
        this.loading = false;
        console.error(err);
      }
    });
  }
}