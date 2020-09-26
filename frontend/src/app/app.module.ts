import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';

import {IssuesService} from 'src/app/issues.service';
import {HttpClientModule} from '@angular/common/http';
import { UserComponent } from './components/user/user.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../app/components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ChooseForMeComponent } from './components/choose-for-me/choose-for-me.component';
import { AdminComponent } from './components/admin/admin.component';
import { BuyerComponent } from './components/buyer/buyer.component';
import { SellerComponent } from './components/seller/seller.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AdDescriptionComponent } from './components/ad-description/ad-description.component';
import {MatChipsModule} from '@angular/material/chips';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import {MatRadioModule} from '@angular/material/radio';
import { SeeProfileComponent } from './components/see-profile/see-profile.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSliderModule} from '@angular/material/slider';
import { BuyerChatComponent } from './components/buyer-chat/buyer-chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatService } from './chat.service';
import { AdminChatComponent } from './components/admin-chat/admin-chat.component';
import { InboxComponent } from './components/inbox/inbox.component';
import {MatListModule} from '@angular/material/list';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ChooseForMeComponent,
    AdminComponent,
    BuyerComponent,
    SellerComponent,
    AdDescriptionComponent,
    AddAdComponent,
    SeeProfileComponent,
    ForgottenPasswordComponent,
    BuyerChatComponent,
    AdminChatComponent,
    InboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatInputModule, 
    MatSelectModule, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatTableModule, 
    MatDividerModule, 
    MatFormFieldModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatTabsModule,
    MatGridListModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatChipsModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatSliderModule,
    BrowserModule,
    FormsModule,
    MatListModule,
    SocketIoModule.forRoot(config)
    
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
