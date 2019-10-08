export class Authentication {
    email: string;
    password: string;

    isValid(): boolean{
        return this.email && this.password && this.email.length > 0 && this.password.length > 0;
    }
}
