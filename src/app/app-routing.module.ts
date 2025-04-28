import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [  
  {
    path: '', redirectTo: 'splash', pathMatch: 'full' 
  },
  { 
    path: 'splash', 
    loadChildren: () => import('../pages/splash/splash.module').then(m => m.SplashPageModule) 
  },
  {
    path: 'login', loadChildren: () => import('../pages/login/login.module').then(m => m.LoginPageModule) 
  },
  {
    path: 'create-account',
    loadChildren: () => import('../pages/create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'generate-password',
    loadChildren: () => import('../pages/generate-password/generate-password.module').then( m => m.GeneratePasswordPageModule)
  },   {
    path: 'role-registration',
    loadChildren: () => import('../pages/role-registration/role-registration.module').then( m => m.RoleRegistrationPageModule)
  },
  {
    path: 'select-company',
    loadChildren: () => import('../pages/select-company/select-company.module').then( m => m.SelectCompanyPageModule)
  },
  {
    path: 'select-professional',
    loadChildren: () => import('../pages/select-professional/select-professional.module').then( m => m.SelectProfessionalPageModule)
  },  
  {
    path: 'select-services',
    loadChildren: () => import('../pages/select-services/select-services.module').then( m => m.SelectServicesPageModule)
  },   {
    path: 'queue',
    loadChildren: () => import('../pages/queue/queue.module').then( m => m.QueuePageModule)
  },
  {
    path: 'customer-list-in-queue',
    loadChildren: () => import('../pages/customer-list-in-queue/customer-list-in-queue.module').then( m => m.CustomerListInQueuePageModule)
  },
  {
    path: 'company-configurations',
    loadChildren: () => import('../pages/company-configurations/company-configurations.module').then( m => m.CompanyConfigurationsPageModule)
  },
  {
    path: 'customer-service',
    loadChildren: () => import('../pages/customer-service/customer-service.module').then( m => m.CustomerServicePageModule)
  },
  {
    path: 'store-details',
    loadChildren: () => import('../pages/store-details/store-details.module').then( m => m.StoreDetailsPageModule)
  },
  {
    path: 'queue-admin',
    loadChildren: () => import('../pages/queue-admin/queue-admin.module').then( m => m.QueueAdminPageModule)
  },
  {
    path: 'queue-details',
    loadChildren: () => import('../pages/queue-details/queue-details.module').then( m => m.QueueDetailsPageModule)
  },
  {
    path: 'service-registration',
    loadChildren: () => import('../pages/service-registration/service-registration.module').then( m => m.ServiceRegistrationPageModule)
  },
  {
    path: 'associated-professional',
    loadChildren: () => import('../pages/associated-professional/associated-professional.module').then( m => m.AssociatedProfessionalPageModule)
  },
  {
    path: 'choose-establishment',
    loadChildren: () => import('../pages/choose-establishment/choose-establishment.module').then( m => m.ChooseEstablishmentPageModule)
  },
  {
    path: 'user-configurations',
    loadChildren: () => import('../pages/user-configurations/user-configurations.module').then( m => m.UserConfigurationsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
