import { Component, OnInit } from '@angular/core';
import { Livro } from './models/Livro';
import { LivroService } from './services/LivroService.service';
import { TableModule } from 'primeng/table';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ButtonModule } from 'primeng/button';
import { Observable, of, switchMap, tap } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-livro',
  standalone: true,
  templateUrl: './livro.component.html',
  styleUrls: ['./livro.component.css'],
  providers: [LivroService, MessageService],
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
export class LivroComponent implements OnInit {

  public dados: Livro[] = [];
  public filter: Livro[] = [];
  public livro: Livro = {};
  public dialog: boolean = false;

  constructor(private service: LivroService, private messageService: MessageService) {}

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
          detail: 'Erro ao carregar os livros',
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

    this.filter = this.dados.filter(dado => dado?.titulo?.toLowerCase().includes(valor));
  }

  public novo() {
    this.dialog = true;
  }

  public editar(livro: Livro) {
    this.livro = {...livro};
    this.dialog = true;
  }

  public excluir(livro: Livro) {
    this.service.excluir(livro.id).subscribe({
      next: () => this.listar(),
      error: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Aviso',
          detail: 'Não é possivel excluir o livro',
        });
      }
    });
  }

  public salvar() {
    this.service.salvar(this.livro).subscribe({
      next: (livro) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Livro salvo',
        });

        this.livro = {};
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
    this.livro = {};
    this.dialog = true;
  }

  public cancelar() {
    this.livro = {};
    this.dialog = false;
  }

}
