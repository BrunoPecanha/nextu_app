import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  {
    path: '', redirectTo: 'splash', pathMatch: 'full' 
  },
  { 
    path: 'splash', 
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule) 
  },
  {
    path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) 
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'generate-password',
    loadChildren: () => import('./generate-password/generate-password.module').then( m => m.GeneratePasswordPageModule)
  },   {
    path: 'role-registration',
    loadChildren: () => import('./role-registration/role-registration.module').then( m => m.RoleRegistrationPageModule)
  },
  {
    path: 'select-company',
    loadChildren: () => import('./select-company/select-company.module').then( m => m.SelectCompanyPageModule)
  },
  {
    path: 'select-professional',
    loadChildren: () => import('./select-professional/select-professional.module').then( m => m.SelectProfessionalPageModule)
  }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
