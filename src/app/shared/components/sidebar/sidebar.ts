import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {

  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }
}