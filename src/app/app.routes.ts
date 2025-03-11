import { Routes } from '@angular/router';
import { LibroComponent } from './pages/libro/libro.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BookComponent } from './pages/book/book.component';

export const routes: Routes = [
    {
        path:'home',
        component: HomeComponent
    },
    {
        path: 'libro',
        component: LibroComponent
    },
    {
        path:'producto',
        component: ProductoComponent
    },
    {
        path: 'book',
        component: BookComponent
    },
    {
        path:'about',
        component: AboutComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
