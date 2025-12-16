import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProviderService } from '../../../core/services/provider.service';
import { Provider } from '../../../core/models/provider';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-provider-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './provider-detail.component.html',
  styleUrl: '../provider-list/provider-list.component.css'
})
export class ProviderDetailComponent implements OnInit {
  provider: Provider | null = null;
  loading = true;
  error = '';

  constructor(
    private providerService: ProviderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProvider(+id);
    }
  }

  loadProvider(id: number): void {
    this.providerService.getById(id).subscribe({
      next: (data) => {
        this.provider = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el proveedor';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteProvider(): void {
    if (this.provider && confirm('¿Estás seguro de eliminar este proveedor?')) {
      this.providerService.delete(this.provider.id).subscribe({
        next: () => this.router.navigate(['/providers']),
        error: (err) => {
          this.error = err.error?.message || 'Error al eliminar proveedor';
          console.error(err);
        }
      });
    }
  }
}