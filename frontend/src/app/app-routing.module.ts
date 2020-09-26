import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { UserComponent } from './components/user/user.component';
import { RegistrationComponent} from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ChooseForMeComponent } from './components/choose-for-me/choose-for-me.component';
import { AdminComponent } from './components/admin/admin.component';
import { BuyerComponent } from './components/buyer/buyer.component';
import { SellerComponent } from './components/seller/seller.component';
import { AdDescriptionComponent } from './components/ad-description/ad-description.component';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import { SeeProfileComponent } from './components/see-profile/see-profile.component';
import { ForgottenPasswordComponent } from './components/forgotten-password/forgotten-password.component';
import { BuyerChatComponent } from './components/buyer-chat/buyer-chat.component';
import { AdminChatComponent } from './components/admin-chat/admin-chat.component';
import { InboxComponent } from './components/inbox/inbox.component';


const routes: Routes = [
 

  {path: '', component: HomeComponent, children:
  [
    {
      path: 'registration', 
      component: RegistrationComponent, 
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'choose-for-me',
      component: ChooseForMeComponent
    }
 ]},
  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'buyer', component: BuyerComponent
  },
  {
    path: 'seller', component: SellerComponent
  },
  {
    path: 'ad-description', component: AdDescriptionComponent
  },
  {
    path: 'add-ad', component: AddAdComponent
  },
  {
    path: 'see-profile', component: SeeProfileComponent
  },
  {
    path: 'forgotten-password', component: ForgottenPasswordComponent
  },
  {
    path: 'buyer-chat', component: BuyerChatComponent
  },
  {
    path: 'admin-chat', component: AdminChatComponent
  },
  {
    path: 'inbox', component: InboxComponent
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
