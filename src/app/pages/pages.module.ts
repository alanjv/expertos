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
        AccountSettingsComponent
    ],
    exports: [
        DashboardComponent,
    ],
    imports: [
    SharedModule,
    PAGES_ROUTES
    ]
})

export class PagesModule { }
