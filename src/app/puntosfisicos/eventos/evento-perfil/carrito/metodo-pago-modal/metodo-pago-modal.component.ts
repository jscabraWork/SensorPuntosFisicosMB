import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface MetodoPago {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-metodo-pago-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './metodo-pago-modal.component.html',
  styleUrl: './metodo-pago-modal.component.scss'
})
export class MetodoPagoModalComponent {
  
  metodosPago: MetodoPago[] = [
    { id: 3, nombre: 'DATÁFONO' },
    { id: 4, nombre: 'EFECTIVO' },
    { id: 5, nombre: 'TRANSFERENCIA' }
  ];
  
  metodoSeleccionado: MetodoPago | null = null;

  constructor(
    private dialogRef: MatDialogRef<MetodoPagoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  seleccionarMetodo(metodo: MetodoPago): void {
    this.metodoSeleccionado = metodo;
  }

  confirmar(): void {
    if (this.metodoSeleccionado) {
      this.dialogRef.close({ confirmado: true, metodo: this.metodoSeleccionado });
    }
  }

  cancelar(): void {
    this.dialogRef.close({ confirmado: false });
  }
}