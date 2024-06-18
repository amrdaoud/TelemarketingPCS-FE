import { Routes} from '@angular/router';
import { authGuard } from './app-core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./side-nav/side-nav.component').then((c) => c.SideNavComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./project/project-list/project-list.component').then(
            (c) => c.ProjectListComponent
          ),canActivate: [authGuard], data: {Roles: ['admin', 'Telemarketer']}
      },
      {
        path: 'create-project',
        loadComponent: () =>
          import('./project/create-project/create-project.component').then(
            (c) => c.CreateProjectComponent
          ),canActivate: [authGuard], data: {Roles: ['admin', 'Telemarketer']}
      },
      {
        path: 'edit-project/:id',
        loadComponent: () =>
          import('./project/edit-project/edit-project.component').then(
            (c) => c.EditProjectComponent
          ),canActivate: [authGuard], data: {Roles: ['admin', 'Telemarketer']}
      },
      {
        path: 'charts',
        loadComponent: () =>
          import('./project/allcharts/allcharts.component').then(
            (c) => c.AllchartsComponent
          ),canActivate: [authGuard], data: {Roles: ['admin', 'Researcher']}
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.component').then(
            (c) => c.HomeComponent
          )
      },
      {
        path: 'evaluations',
        loadComponent: () =>
          import('./project/evaluations/evaluation/evaluation.component').then(
            (c) => c.EvaluationComponent
          )
      }
    ],
  },
  {
    path: '403',
        loadComponent: () =>
          import('./app-core/redirects/not-eligible/not-eligible.component').then(
            (c) => c.NotEligibleComponent
          )
  },
  {
    path: '**',
        loadComponent: () =>
          import('./project/notfound/notfound.component').then(
            (c) => c.NotfoundComponent
          )
  }

];
