import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

import { AuthService } from '../../core/providers';
import { AuthInterface } from '../../core/interfaces/services/auth.interface';

@Injectable()
export class PreventAccessGuard implements CanActivate {

    constructor(
        @Inject(AuthService) private authService: AuthInterface,
        @Inject(Router) private router: Router
    ) {}

    canActivate() {
        if (this.authService.isAuthenticated()) {
            return true;
        }

        this.router.navigate(['/']);
        return false;
    }
}
