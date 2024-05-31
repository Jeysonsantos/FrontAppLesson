import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstilofundoComponent } from './componentes/estilofundo/estilofundo.component';
import { LessonComponent } from './componentes/lesson/lesson.component';
import { ObservationComponent } from './componentes/observation/observation.component';
import { IncidentComponent } from './componentes/incident/incident.component';
import { HomeComponent } from './componentes/home/home.component';
import { TextoslistComponent } from './componentes/textoslist/textoslist.component';

const routes: Routes = [
  {path: 'estilofundo', component: EstilofundoComponent},
  {path: "lesson", component:LessonComponent},
  {path: "observation", component:ObservationComponent},
  {path: "incident", component:IncidentComponent},
  {path: "",component:TextoslistComponent},
  {path: "home",component:TextoslistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
