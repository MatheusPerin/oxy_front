import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { LivroComponent } from '../livro/livro.component';
import { UsuarioComponent } from "../usuario/usuario.component";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: true,
  imports: [TabMenuModule, CommonModule, LivroComponent, UsuarioComponent]
})
export class InicioComponent implements OnInit {

  ngOnInit(): void {
    
  }

  items: MenuItem[] = [
    { label: 'Gerenciar Livros', icon: 'pi pi-book', id: 'app-livro' },
    { label: 'Gerenciar Usuários', icon: 'pi pi-users', id: 'app-usuario' },
    { label: 'Gerenciar Empréstimos', icon: 'pi pi-calendar', id: 'app-emprestimo' }
  ];

  activeItem: MenuItem = this.items[0];

}
