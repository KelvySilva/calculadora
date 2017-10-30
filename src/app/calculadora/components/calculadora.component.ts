import { Component, OnInit } from '@angular/core';

import { CalculadoraService } from '../services';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

	private numero1: string;
	private numero2: string;
	private resultado: number;
	private operacao: string;
	
  constructor(private calculadoraService: CalculadoraService) { 
  }

  ngOnInit() {
  	this.limpar();
  }

  limpar(): void{
  	this.numero1 ='0';
  	this.numero2 =null;
  	this.resultado =null;
  	this.operacao =null;
  }

  adicionarNUmero(){
  	if (this.operacao === null) {
  		this.numero1 = this.concatenarNumero(this.numero1, numero);
  	}else{
  		this.numero2 = this.concatenarNumero(this.numero2, numero);
  	}
  }

  concatenarNumero(numActual: string, numConcat: string): string{
  	if (numActual ==='0' || numActual === '') {
  		numActual ='';
  	}

  	if (numConcat ==='.' && numActual === '') {
  		return '0.';
  	}

  	if (numConcat ==='.' && numActual.indexOf('.') > -1) {
  		return numActual;
  	}
  	return numActual + numConcat;
  }

  definirOperacao(operacao: string): void {
    // apenas define a operação caso não exista uma
  	if (this.operacao === null) {
      this.operacao = operacao;
      return;
  	}

    /* caso operação definida e número 2 selecionado,
       efetua o cálculo da operação */
  	if (this.numero2 !== null) {
  		this.resultado = this.calculadoraService.calcular(
  			parseFloat(this.numero1), 
  			parseFloat(this.numero2), 
  			this.operacao);
  		this.operacao = operacao;
  		this.numero1 = this.resultado.toString();
  		this.numero2 = null;
  		this.resultado = null;
  	}
  }

  /**
   * Efetua o cálculo de uma operação.
   *
   * @return void
   */
  calcular(): void {
  	if (this.numero2 === null) {
  		return;
  	}

  	this.resultado = this.calculadoraService.calcular(
  		parseFloat(this.numero1), 
  		parseFloat(this.numero2), 
  		this.operacao);
  }

  /**
   * Retorna o valor a ser exibido na tela da calculadora.
   *
   * @return string
   */
  get display(): string {
  	if (this.resultado !== null) {
  		return this.resultado.toString();
  	}
  	if (this.numero2 !== null) {
  		return this.numero2;
  	}
  	return this.numero1;
  }

}
