import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/services/auth';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-auth-callback',
  template: '<p>Cargando sesión...</p>',
  styleUrls: ['./auth-callback.scss'],
  standalone: false
})
export class AuthCallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      const code = params['code'];
      if (code) {
        this.authService.handleRedirectCallback(code).subscribe(
          success => {
            if (success) {
              this.router.navigate(['/home']);
            } else {
              this.router.navigate(['/']);
            }
          },
          () => {
            this.router.navigate(['/']);
          }
        );
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}