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
        redirectTo: 'charts'
      },
      {
        path: 'projects',
        loadComponent: () =>
          import('./project/project-list/project-list.component').then(
            (c) => c.ProjectListComponent
          )
      },
      {
        path: 'create-project',
        loadComponent: () =>
          import('./project/create-project/create-project.component').then(
            (c) => c.CreateProjectComponent
          )
      },
      {
        path: 'edit-project/:id',
        loadComponent: () =>
          import('./project/edit-project/edit-project.component').then(
            (c) => c.EditProjectComponent
          )
      },
      {
        path: 'charts',
        loadComponent: () =>
          import('./project/allcharts/allcharts.component').then(
            (c) => c.AllchartsComponent
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
  }

];
