import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LivroComponent } from './livro/livro.component';
import { TabMenu, TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { CommonModule, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { InicioComponent } from './inicio/inicio.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InicioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'biblioteca-front';
}
