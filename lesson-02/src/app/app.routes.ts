import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }

];
