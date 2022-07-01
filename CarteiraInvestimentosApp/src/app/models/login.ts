export class Login{
    loginId!: number;
    loginEmail!: string;
    loginSenha!: string;
    
    constructor(loginEmail: string, loginSenha: string) {
        this.loginEmail = loginEmail;
        this.loginSenha = loginSenha;
    }
}