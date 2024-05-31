import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EstilofundoComponent } from './componentes/estilofundo/estilofundo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes }   from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LessonComponent } from './componentes/lesson/lesson.component';
import { IncidentComponent } from './componentes/incident/incident.component';
import { ObservationComponent } from './componentes/observation/observation.component';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { HomeComponent } from './componentes/home/home.component';
import { AdicionarLabelDialogComponent } from './componentes/adicionar-textos/adicionar-label-dialog/adicionar-label-dialog.component'; 
import { MatDialogModule } from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import { TextoslistComponent } from './componentes/textoslist/textoslist.component';
import { AdicionarTextosComponent } from './componentes/adicionar-textos/adicionar-textos.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    EstilofundoComponent,
    LessonComponent,
    IncidentComponent,
    ObservationComponent,
    HomeComponent,
    AdicionarLabelDialogComponent,
    TextoslistComponent,
    AdicionarTextosComponent
  ],
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule,
    RouterModule.forRoot([]),
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatRadioModule,
    MatProgressBarModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
