import { Routes } from '@angular/router';
import { RecipeComponent } from './components/recipe/recipe.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { UserComponent } from './components/user/user.component';


export const routes: Routes = [
    {path: '', component: RecipeComponent},
    {path: 'sign-up', component: SignupComponent},
    {path: 'sign-in', component: SigninComponent},
    {path: 'user', component: UserComponent}
];
