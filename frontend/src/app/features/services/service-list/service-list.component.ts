import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceService } from '../../../core/services/service.service';
import { Service } from '../../../core/models/service';

@Component({
  selector: 'app-service-list',
  imports: [RouterLink],
  templateUrl: './service-list.component.html',
  styleUrl: './service-list.component.css'
})
export class ServiceListComponent implements OnInit {
  services: Service[] = [];
  loading = true;
  error = '';

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.loading = true;
    this.serviceService.getAll().subscribe({
      next: (data) => {
        this.services = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar servicios';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteService(id: number): void {
    if (confirm('¿Estás seguro de eliminar este servicio?')) {
      this.serviceService.delete(id).subscribe({
        next: () => this.loadServices(),
        error: (err) => {
          this.error = err.error?.message || 'Error al eliminar servicio';
          console.error(err);
        }
      });
    }
  }
}