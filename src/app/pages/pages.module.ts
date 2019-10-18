import { CommonModule } from '@angular/common';
import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';



import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTES } from './pages.routes';
import { PrincipalComponent } from './principal/principal.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ImagesComponent } from './images/images.component';
import { VideosComponent } from './videos/videos.component';
import { ArchivesComponent } from './archives/archives.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { PostsComponent } from './posts/posts.component';
import { ComentsComponent } from './coments/coments.component';
import { TemplatesComponent } from './templates/templates.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { PostComponent } from './posts/post.component';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        PrincipalComponent,
        UsuariosComponent,
        ImagesComponent,
        VideosComponent,
        ArchivesComponent,
        CreatePageComponent,
        PostsComponent,
        ComentsComponent,
        TemplatesComponent,
        AccountSettingsComponent,
        ProfileComponent,
        ModalUploadComponent,
        CategoriasComponent,
        PostComponent
    ],
    exports: [
        DashboardComponent,
    ],
    imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
    ]
})

export class PagesModule { }
