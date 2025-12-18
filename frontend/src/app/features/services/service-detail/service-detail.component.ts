import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ServiceService } from '../../../core/services/service.service';
import { Service } from '../../../core/models/service';

@Component({
  selector: 'app-service-detail',
  imports: [RouterLink],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css'
})
export class ServiceDetailComponent implements OnInit {
  service: Service | null = null;
  loading = true;
  error = '';

  constructor(
    private serviceService: ServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadService(+id);
    }
  }

  loadService(id: number): void {
    this.serviceService.getById(id).subscribe({
      next: (data) => {
        this.service = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el servicio';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteService(): void {
    if (this.service && confirm('¿Estás seguro de eliminar este servicio?')) {
      this.serviceService.delete(this.service.id).subscribe({
        next: () => this.router.navigate(['/services']),
        error: (err) => {
          this.error = err.error?.message || 'Error al eliminar servicio';
          console.error(err);
        }
      });
    }
  }
}