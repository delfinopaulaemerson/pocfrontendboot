export class Customer{
   id?: number;
   nome?: string;
   email?: string;
   papel?: string;

   constructor(id:number,nome: string,email:string,papel:string) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.papel = papel;
  }

}