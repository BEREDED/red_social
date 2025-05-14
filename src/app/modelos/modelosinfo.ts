
export namespace todosmodelos{
  export interface Usuarrio{
    nombre:string;
    correo:string;
    Fecha: Date;
    contraseña:string;
    image?:File;
  }
  export interface foros{
    creador:string;
    nombreforo:string;
  }

}
