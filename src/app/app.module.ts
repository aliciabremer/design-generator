import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeModule } from './home/home.module';
import { PreferencesModule } from './preferences/preferences.module';
import { InsightsModule } from './insights/insights.module';
import { PinsModule } from './pins/pins.module';
import { CalenderModule } from './calender/calender.module';
import { CreateModule } from './create/create.module';
import { TemplatesModule } from './templates/templates.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppFirebaseModule } from './app-firebase.module';
import { AppMaterialModule } from './app-material.module';
import { AccountModule } from './account/account.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AppRoutingModule,
    PreferencesModule,
    InsightsModule,
    PinsModule,
    CalenderModule,
    CreateModule,
    TemplatesModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    FormsModule,
    SharedModule,
    CoreModule,
    AppFirebaseModule,
    AppMaterialModule,
    RouterModule,
    AccountModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule 
{ 
  constructor(
    private readonly router: Router,
  ) {
    router.events
      .subscribe(console.log)
  }

}
