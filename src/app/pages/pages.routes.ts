import { TemplatesComponent } from './templates/templates.component';
import { ImagesComponent } from './images/images.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { ComentsComponent } from './coments/coments.component';
import { ArchivesComponent } from './archives/archives.component';
import {RouterModule,  Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostsComponent } from './posts/posts.component';
import { PrincipalComponent } from './principal/principal.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { VideosComponent } from './videos/videos.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const pagesRoutes: Routes = [
 {
   path: '',
   component: PagesComponent,
    children: [
      { path: 'admin', component: DashboardComponent},
      { path: 'archives', component: ArchivesComponent},
      { path: 'coments', component: ComentsComponent},
      { path: 'create-page', component: CreatePageComponent},
      { path: 'images', component: ImagesComponent},
      { path: 'posts', component: PostsComponent},
      { path: 'principal', component: PrincipalComponent},
      { path: 'templates', component: TemplatesComponent},
      { path: 'users', component: UsuariosComponent},
      { path: 'videos', component: VideosComponent},
      { path: 'account-settings', component: AccountSettingsComponent},
      { path: '', redirectTo: '/admin', pathMatch: 'full'}
   ]
  }
];



export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
