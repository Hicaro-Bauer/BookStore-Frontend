import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})

export class LivroUpdateComponent implements OnInit {
  
  id_categoria: String = ''

  livro: Livro = {  
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  titulo = new FormControl('', [Validators.minLength(2)])
  nome_autor = new FormControl('', [Validators.minLength(2)])
  texto = new FormControl('', [Validators.minLength(10)])

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.id_categoria = this.route.snapshot.paramMap.get('id_cat')!
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById(): void{
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta
    })
  }

  update(): void {
    this.service.update(this.livro).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_categoria}/livros`])
      this.service.mensagem('O livro foi atualizado com sucesso!!')
    }, err => {
      this.router.navigate([`categorias/${this.id_categoria}/livros`])
      this.service.mensagem('Ocorreu uma falha ao atualizar o livro. Tente novamente.')
    })
  }

  voltar(): void {
    this.router.navigate([`categorias/${this.id_categoria}/livros`])
  }

  getMessage(){
    if(this.titulo.invalid){
      return "O campo título deve conter entre 2 e 100 caracteres"
    }
    if(this.nome_autor.invalid){
      return "O campo nome do autor deve conter entre 2 e 100 caracteres"
    }
    if(this.texto.invalid){
      return "O campo texto deve conter entre 10 e 2.000.000.000 caracteres"
    }
    return false
  }

 
}
