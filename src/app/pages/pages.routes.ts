import { LoginGuardGuard } from './../services/service.index';
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
   canActivate:[LoginGuardGuard],
    children: [
      { path: 'admin', component: DashboardComponent, data: {titulo: 'Admin', padre: 'Principal'}},
      { path: 'archives', component: ArchivesComponent, data: {titulo: 'Archivos', padre: 'Archivos'}},
      { path: 'coments', component: ComentsComponent, data: {titulo: 'Comentarios', padre: 'Paginas'}},
      { path: 'create-page', component: CreatePageComponent, data: {titulo: 'Crear Pagina', padre: 'Paginas'}},
      { path: 'images', component: ImagesComponent, data: {titulo: 'Imagenes', padre: 'Archivos'}},
      { path: 'posts', component: PostsComponent, data: {titulo: 'Posts', padre: 'Paginas'}},
      { path: 'principal', component: PrincipalComponent, data: {titulo: 'Pagina Principal', padre: ''}},
      { path: 'templates', component: TemplatesComponent, data: {titulo: 'Plantillas', padre: 'Temas'}},
      { path: 'users', component: UsuariosComponent, data: {titulo: 'Usuarios', padre: 'Principal'}},
      { path: 'videos', component: VideosComponent, data: {titulo: 'Videos', padre: 'Archivos'}},
      { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Configuracion', padre: 'Temas'}},
      { path: '', redirectTo: '/admin', pathMatch: 'full'}
   ]
  }
];



export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
