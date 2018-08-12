import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'
import { AppComponent } from './app.component';
import { ListauthorComponent } from './components/listauthor/listauthor.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import {AuthorService} from './shared-service/author.service';
import {HttpModule} from '@angular/http'
import {FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
const appRoutes:Routes=[
  {path:'', component:ListauthorComponent},
  {path:'op', component:AuthorFormComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ListauthorComponent,
    AuthorFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
