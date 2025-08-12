import { Component, OnInit, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.scss'
})
export class NavegacionComponent {
  @Input() menuItems: { path: string, label: string }[] = [];
  @Output() onMenuItemClick = new EventEmitter<void>();

  //Para manejar el estado activo del menú
  @Input() activeState: number = 0;
  
  extender: boolean = true;

  toggleMenu() {
    this.extender = !this.extender;
    this.onMenuItemClick.emit();
  }
}
