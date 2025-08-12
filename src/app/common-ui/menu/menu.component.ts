import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { HardcodedAutheticationService } from '../../service/security/hardcoded-authetication.service';



@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent implements OnInit {
  isCollapsed = true;
  isMobile = false;
  idPunto: string = '';
  
  navItems: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() { 
    this.checkScreenSize();
  
    this.route.parent?.params.subscribe(params => {
      this.idPunto = params['idPunto'];
      
      // Configurar las rutas con el ID del promotor
      this.navItems = [
        { route: `/taquilla/${this.idPunto}/eventos`, icon: 'assets/vector/menu/ticket.svg', label: 'Vender' },
        { route: '/logout', icon: 'assets/vector/menu/logout.svg', label: 'Cerrar Sesión', isLogout: true }
      ];
    });

  }


  @HostListener('window:resize') onResize() { this.checkScreenSize(); }

  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  onMouseEnter() { this.isCollapsed = false; }
  onMouseLeave() { this.isCollapsed = true; }
  
  toggleSidebar() { this.isCollapsed = !this.isCollapsed; }
  closeSidebar() { if (this.isMobile) this.isCollapsed = true; }
}
