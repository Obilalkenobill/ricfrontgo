import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn) {
            return true;
        }

        // Navigate to the login page with extras
        this.authService.redirectUrl = url;
        this.router.navigate(['/auth']);
        return false;
    }
}

@Injectable({
    providedIn: 'root',
})
export class AdminGuard implements CanActivate
{
    isAdmin:boolean=false;
    constructor(private authService: AuthService) {
        this.isAdmin=this.canActivate();
    }

    canActivate(): boolean {
        if(this.authService.getCurrentUser()?.roles?.includes("yo2)x4u34}5é(0H5é1GXS6ta4xf2h9e5*Dé@48T4£p)xR8_#4gd6Co3f#OyàciffXYi2zeI$T$éou9m8!ftoO4à72è2o1gK7H6sp6vf21m0-D57Fé!6gNr5Oc9YjG7hrR{}0(t/kXy)154àtu7eh1udgj6_z-c-6Mn)çrCdKOMiqC^14è&R5VvoeYx8}Z_6hs7ey#ou4ylxE1à1s/8IpeRAzy8Z1kCM8è21w22pvu6xkt70pd8724G8qyR"))
        {
            return true;
        }
        return false;
    }
}

@Injectable({
    providedIn: 'root',
})
export class SuperAdminGuard implements CanActivate
{
    isSuperAdmin:boolean=false;
    constructor(private authService: AuthService) {
        this.isSuperAdmin=this.canActivate();
    }

    canActivate(): boolean {
        if(this.authService.getCurrentUser()?.roles?.includes("ROLE_SUPER_ADMIN"))
        {
            return true;
        }
        return false;
    }
}


@Injectable({
    providedIn: 'root',
})
export class is_verifiedGuard implements CanActivate
{
    is_verified:boolean=false;
    constructor(private authService: AuthService) {
        this.is_verified=this.canActivate();
    }

    canActivate(): boolean {
        if(this.authService.getCurrentUser()?.is_verified==1)
        {
            return true;
        }
        return false;
    }
}
