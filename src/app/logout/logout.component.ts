import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/security/auth.service';
import { HardcodedAutheticationService } from '../service/security/hardcoded-authetication.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {

  constructor(
    private autentication: HardcodedAutheticationService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.autentication.logout();
    this.auth.logout();
  }

}