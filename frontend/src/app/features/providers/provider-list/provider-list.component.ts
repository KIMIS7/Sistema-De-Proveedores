import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProviderService } from '../../../core/services/provider.service';
import { Provider } from '../../../core/models/provider';

@Component({
  selector: 'app-provider-list',
  imports: [RouterLink],
  templateUrl: './provider-list.component.html',
  styleUrl: './provider-list.component.css'
})
export class ProviderListComponent implements OnInit {
  providers: Provider[] = [];
  loading = true;
  error = '';

  constructor(private providerService: ProviderService) {}

  ngOnInit(): void {
    this.loadProviders();
  }

  loadProviders(): void {
    this.loading = true;
    this.providerService.getAll().subscribe({
      next: (data) => {
        this.providers = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar proveedores';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteProvider(id: number): void {
    if (confirm('¿Estás seguro de eliminar este proveedor?')) {
      this.providerService.delete(id).subscribe({
        next: () => this.loadProviders(),
        error: (err) => {
          this.error = err.error?.message || 'Error al eliminar proveedor';
          console.error(err);
        }
      });
    }
  }
}