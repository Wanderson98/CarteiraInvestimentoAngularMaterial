import { AbstractControl } from "@angular/forms";

﻿export class ValidarCpf {

    constructor() {

    }

    // public static cpf(controle: AbstractControl){
    //     const cpf = controle.value;
    //     if (cpf == null) {
    //         return false;
    //     }
    //     if (cpf.length != 11) {
    //         return false;
    //     }
    //     if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
    //         return false;
    //     }
    //     let numero: number = 0;
    //     let caracter: string = '';
    //     let numeros: string = '0123456789';
    //     let j: number = 10;
    //     let somatorio: number = 0;
    //     let resto: number = 0;
    //     let digito1: number = 0;
    //     let digito2: number = 0;
    //     let cpfAux: string = '';
    //     cpfAux = cpf.substring(0, 9);
    //     for (let i: number = 0; i < 9; i++) {
    //         caracter = cpfAux.charAt(i);
    //         if (numeros.search(caracter) == -1) {
    //             return false;
    //         }
    //         numero = Number(caracter);
    //         somatorio = somatorio + (numero * j);
    //         j--;
    //     }
    //     resto = somatorio % 11;
    //     digito1 = 11 - resto;
    //     if (digito1 > 9) {
    //         digito1 = 0;
    //     }
    //     j = 11;
    //     somatorio = 0;
    //     cpfAux = cpfAux + digito1;
    //     for (let i: number = 0; i < 10; i++) {
    //         caracter = cpfAux.charAt(i);
    //         numero = Number(caracter);
    //         somatorio = somatorio + (numero * j);
    //         j--;
    //     }
    //     resto = somatorio % 11;
    //     digito2 = 11 - resto;
    //     if (digito2 > 9) {
    //         digito2 = 0;
    //     }
    //     cpfAux = cpfAux + digito2;
    //     if (cpf != cpfAux) {
    //         return null;
    //     }
    //     else {
    //         return true;
    //     }
    // }
    
    static ValidaCpf(controle: AbstractControl) {
        const cpf = controle.value;
    
        let soma: number = 0;
        let resto: number;
        let valido: boolean;
    
        const regex = new RegExp('[0-9]{11}');
    
        if (
          cpf == '00000000000' ||
          cpf == '11111111111' ||
          cpf == '22222222222' ||
          cpf == '33333333333' ||
          cpf == '44444444444' ||
          cpf == '55555555555' ||
          cpf == '66666666666' ||
          cpf == '77777777777' ||
          cpf == '88888888888' ||
          cpf == '99999999999' ||
          !regex.test(cpf)
        )
          valido = false;
        else {
          for (let i = 1; i <= 9; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
          resto = (soma * 10) % 11;
    
          if (resto == 10 || resto == 11) resto = 0;
          if (resto != parseInt(cpf.substring(9, 10))) valido = false;
    
          soma = 0;
          for (let i = 1; i <= 10; i++)
            soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
          resto = (soma * 10) % 11;
    
          if (resto == 10 || resto == 11) resto = 0;
          if (resto != parseInt(cpf.substring(10, 11))) valido = false;
          valido = true;
        }
    
        if (valido) return null;
    
        return { cpfInvalido: true };
      }
}