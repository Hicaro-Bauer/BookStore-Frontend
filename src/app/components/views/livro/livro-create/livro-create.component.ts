import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {
  
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
  }

  create(): void {
      this.service.create(this.livro, this.id_categoria).subscribe(resposta => {
        this.router.navigate([`categorias/${this.id_categoria}/livros`])
        this.service.mensagem('O livro foi cadastrado com sucesso!!')
      }, err => {
        this.router.navigate([`categorias/${this.id_categoria}/livros`])
        this.service.mensagem('Ocorreu um erro ao cadastrar o livro. Tente mais tarde.')
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
