import { Component } from '@angular/core';
import { MenuComponent } from '../common-ui/menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-puntosfisicos',
  standalone: true,
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './puntosfisicos.component.html',
  styleUrl: './puntosfisicos.component.scss'
})
export class PuntosfisicosComponent {

}
