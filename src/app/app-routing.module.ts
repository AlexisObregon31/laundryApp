import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./servicios/servicios.module').then(m => m.ServiciosPageModule)
  },
  {
    path: 'lavanderias',
    loadChildren: () => import('./lavanderias/lavanderias.module').then(m => m.LavanderiasPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'recup-sena',
    loadChildren: () => import('./recup-sena/recup-sena.module').then(m => m.RecupSenaPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./editar-perfil/editar-perfil.module').then(m => m.EditarPerfilPageModule)
  },
  {
    path: 'perfil-empresa',
    loadChildren: () => import('./perfil-empresa/perfil-empresa.module').then(m => m.PerfilEmpresaPageModule)
  },
  {
    path: 'servicio-objeto',
    loadChildren: () => import('./servicio-objeto/servicio-objeto.module').then(m => m.ServicioObjetoPageModule)
  },
  {
    path: 'prueba-imagen',
    loadChildren: () => import('./prueba-imagen/prueba-imagen.module').then(m => m.PruebaImagenPageModule)
  },
  {
    path: 'imagen-prueba',
    loadChildren: () => import('./imagen-prueba/imagen-prueba.module').then(m => m.ImagenPruebaPageModule)
  },
  {
    path: 'ampliar-imagen/:id',
    loadChildren: () => import('./ampliar-imagen/ampliar-imagen.module').then(m => m.AmpliarImagenPageModule)
  },
  {
    path: 'validar-usuario',
    loadChildren: () => import('./validar-usuario/validar-usuario.module').then( m => m.ValidarUsuarioPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
