import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './services/auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'stock',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]}, {
    path: 'login',
    component: LoginComponent,
    },
  {
    path: '**',
    redirectTo: 'stock'
  }
]
