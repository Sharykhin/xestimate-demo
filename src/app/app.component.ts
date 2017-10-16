import { Component, Inject, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from './core/providers/core.provider';
import { AuthInterface } from './core/interfaces/services/auth.interface';
import { UserModel } from './core/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public isAuthenticated: boolean;

  constructor(
      @Inject(AuthService) private authService: AuthInterface,
      @Inject(Router) private router: Router
  ) {}

  ngOnInit() {
    this.checkAuth();
    if (this.isAuthenticated) {
      this.router.navigate(['/estimation']);
    }
  }

  hideForm(user: UserModel) {
    console.log('user has been registered', user);
    this.checkAuth();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.checkAuth();
  }

  private checkAuth() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}
