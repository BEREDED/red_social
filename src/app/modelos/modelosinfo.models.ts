import { Usuario } from './Usuario.interface';
import { foros } from './foro.interface';
import { Comentario } from './comentario.interface';
import { Post } from './post.interface';
import { Mensajes } from './mensajes.interface';
import { Usuario_ini } from './Usuario_ini';
import { Usuario_rec } from './usuario_rec';

export namespace todosmodelos{
    export interface Usuario{}
    export interface foros{}
    export interface Post{}
    export interface Comentario{}
    export interface Mensajes{}
    export interface Usuario_ini{}
    export interface Usuario_rec{}
}

export { Usuario , foros , Post , Comentario, Mensajes, Usuario_ini, Usuario_rec };
