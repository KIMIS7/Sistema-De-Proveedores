import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { RateService } from '../../../core/services/rate.service';
import { Rate } from '../../../core/models/rate';

@Component({
  selector: 'app-rate-detail',
  imports: [RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './rate-detail.component.html',
  styleUrl: './rate-detail.component.css'
})
export class RateDetailComponent implements OnInit {
  rate: Rate | null = null;
  loading = true;
  error = '';

  constructor(
    private rateService: RateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadRate(+id);
    }
  }

  // Carga un tarifario específico
  loadRate(id: number): void {
    this.rateService.getById(id).subscribe({
      next: (data) => {
        this.rate = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el tarifario';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Elimina el tarifario actual
  deleteRate(): void {
    if (this.rate && confirm('¿Estás seguro de eliminar este tarifario?')) {
      this.rateService.delete(this.rate.id).subscribe({
        next: () => this.router.navigate(['/rates']),
        error: (err) => {
          this.error = err.error?.message || 'Error al eliminar tarifario';
          console.error(err);
        }
      });
    }
  }
}