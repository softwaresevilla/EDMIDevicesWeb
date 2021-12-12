import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const devicesModule = () => import('./devices/devices.module').then(x => x.DevicesModule);

const routes: Routes = [
    { path: '', loadChildren: devicesModule },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }