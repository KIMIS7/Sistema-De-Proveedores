import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { RateService } from '../../../core/services/rate.service';
import { Rate } from '../../../core/models/rate';

@Component({
  selector: 'app-rate-list',
  // DatePipe formatea fechas, CurrencyPipe formatea precios
  imports: [RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './rate-list.component.html',
  styleUrl: './rate-list.component.css'
})
export class RateListComponent implements OnInit {
  // Array de tarifarios
  rates: Rate[] = [];
  loading = true;
  error = '';

  constructor(private rateService: RateService) {}

  ngOnInit(): void {
    this.loadRates();
  }

  // Obtiene todos los tarifarios del backend
  loadRates(): void {
    this.loading = true;
    
    // GET /api/rates
    this.rateService.getAll().subscribe({
      next: (data) => {
        this.rates = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar tarifarios';
        this.loading = false;
        console.error(err);
      }
    });
  }

  // Elimina un tarifario
  deleteRate(id: number): void {
    if (confirm('¿Estás seguro de eliminar este tarifario?')) {
      // DELETE /api/rates/:id
      this.rateService.delete(id).subscribe({
        next: () => this.loadRates(),
        error: (err) => {
          this.error = err.error?.message || 'Error al eliminar tarifario';
          console.error(err);
        }
      });
    }
  }
}