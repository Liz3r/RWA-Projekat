import { Routes } from "@angular/router";
import { LoginComponent } from "./components/logreg/login/login.component";

const routeConfig: Routes = [
    {
      path: '',
      component: LoginComponent,
      title: 'Home page'
    }
  ];
  
export default routeConfig;