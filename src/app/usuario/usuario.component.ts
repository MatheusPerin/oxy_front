import { Component, OnInit } from '@angular/core';
import { UsuarioService } from './services/UsuarioService.service';
import { MessageService } from 'primeng/api';
import { Usuario } from './models/Usuario';
import { HttpErrorResponse } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-usuario',
  standalone: true,
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [UsuarioService, MessageService],
  imports: [
    TableModule, 
    InputIconModule, 
    IconFieldModule, 
    ButtonModule, 
    DialogModule, 
    CommonModule, 
    InputTextModule, 
    FormsModule,
    CalendarModule,
    DropdownModule,
    FloatLabelModule,
    ToastModule
  ],
})
export class UsuarioComponent implements OnInit {

  public dados: Usuario[] = [];
  public filter: Usuario[] = [];
  public usuario: Usuario = {};
  public dialog: boolean = false;

  constructor(private service: UsuarioService, private messageService: MessageService) {}

  ngOnInit() {
    this.listar();
    console.log(this.dados);
  }

  public listar() {
    this.service.listar().subscribe({
      next: (dados) => {
        this.dados = [...dados];
        this.filter = [...dados];
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao carregar os usuários',
        });

        this.dados = [];
        this.filter = [];
      },
    })
  }

  public filtrar(event: Event) {
    const valor: string = (event.target as HTMLInputElement).value.toLowerCase();

    if (!valor) {
      this.filter = [...this.dados]
      return;
    };

    this.filter = this.dados.filter(dado => dado?.nome?.toLowerCase().includes(valor));
  }

  public novo() {
    this.dialog = true;
  }

  public editar(usuario: Usuario) {
    this.usuario = {...usuario};
    this.dialog = true;
  }

  public excluir(usuario: Usuario) {
    this.service.excluir(usuario.id).subscribe({
      next: () => this.listar(),
      error: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'Não é possivel excluir o usuário',
        });
      }
    });
  }

  public salvar() {
    this.service.salvar(this.usuario).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Usuário salvo',
        });

        this.usuario = {};
        this.listar();
        this.dialog = false;
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) {
          this.messageService.add({
            severity: 'warn',
            summary: 'Aviso',
            detail: error.error.mensagem,
          });

          return;
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: error.error.mensagem,
        });
      }
    })
  }

  public incluir() {
    this.usuario = {};
    this.dialog = true;
  }

  public cancelar() {
    this.usuario = {};
    this.dialog = false;
  }

}
