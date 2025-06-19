import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { foros, Usuario, Usuario_ini, Usuario_rec, Post, Comentario } from '../modelos/modelosinfo.models';
import { Usu_actulizar } from '../modelos/us_actulizar';
import { getdata } from '../modelos/getdata.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Grupo } from '../modelos/grupos.interface';
//environment.apiUrl
@Injectable({ providedIn: 'root' })
export class UsuariosService {
  api_http_rout = "http://localhost:3000/";
  //api_http_rout= "https://dpb2zz9s-3000.usw3.devtunnels.ms/"
  constructor(private http: HttpClient) {}
  getForos() {
    return this.http.get(`${this.api_http_rout}usuarios`);
  }
  getForosPost(id:number){
    return this.http.get(`${this.api_http_rout}usuarios/${id}`);
  }
  postRegistroUsuario(usuario:Usuario){
    return this.http.post(`${this.api_http_rout}usuarios/crear_us`, usuario);
  }
  getListadoForos(Correo: string): Observable<{ foros_Inscritos: { Titulo_foro: string }[] }> {
  return this.http.post<{ foros_Inscritos: { Titulo_foro: string }[] }>(`${this.api_http_rout}usuarios/listarForos`,{ Correo });
  }
  getListadoGrps(Correo:string): Observable<{ grupos_Inscritos: { Nombre_Grupo: string }[] }>{
    return this.http.post<{ grupos_Inscritos: { Nombre_Grupo: string }[] }>(`${this.api_http_rout}usuarios/listarGrupos`,{ Correo });
  }

  getInfoForo(Titulo_foro:string){
    return this.http.post<{Descripcion:string}>(`${this.api_http_rout}foro/getdata`, { Titulo_foro } );
  }
  postCreacionForo(foro:foros){
    return this.http.post(`${this.api_http_rout}foro/create_foro`, foro);
  }
  postCreacionGrp(grupo:Grupo){
    return this.http.post(`${this.api_http_rout}Grupos/Crear_grp`, grupo);
  }
  postCreacionPost(post:Post){
    return this.http.post(`${this.api_http_rout}posts`, post);
  }
  postLogin(us_ini: Usuario_ini) {
    return this.http.post<{ autenticado: boolean, token?: string }>(`${this.api_http_rout}usuarios/login`,us_ini);
  }
  postNuevaContr(usu_rec:Usuario_rec){
    return this.http.post<{cambio_contr: boolean}>(`${this.api_http_rout}usuarios/act_contr`, usu_rec)
  }
  postActualizardata(usu_act:Usu_actulizar){
    return this.http.post(`${this.api_http_rout}usuarios/actualizar`, usu_act)
  }
  Postsoldata(correo:getdata) {
  return this.http.post<{namedb:string,Correo:string, fecha_nac:string}>(`${this.api_http_rout}usuarios/get_data`,correo);
  }
  postissuscribed(Titulo_foro:string,correo_Usuario:string){
    return this.http.post<{issus:boolean}>(`${this.api_http_rout}foro/issuscribed`,{Titulo_foro,correo_Usuario})
  }

  postInscribirForo(Titulo_foro:string,correo_Usuario:string, Fecha_Union:string){
    return this.http.post<{Mensaje:string}>(`${this.api_http_rout}foro/inscribir_foro`,{Titulo_foro,correo_Usuario,Fecha_Union})
  }
  postDesinscribirForo(Titulo_foro:string,correo_Usuario:string){
    return this.http.post<{Mensaje:string}>(`${this.api_http_rout}foro/deinscribir_foro`,{Titulo_foro,correo_Usuario})
  }
  postCrearPost(post:Post){
    return this.http.post<{Mensaje:string}>(`${this.api_http_rout}foro/Crear_post`, post)
  }
  recuperarpsots(nombreForo: string): Observable<{ posts: { Fecha_Publicacion: string, Contenido: string, Usuario_creador: string, Id_Publicacion:number  }[] }> {
  return this.http.post<{ posts: { Fecha_Publicacion: string, Contenido: string, Usuario_creador: string ,Id_Publicacion:number}[] }>(
    `${this.api_http_rout}foro/recuperar_posts`,
    { nombreForo }
  );
  }
  getallUsers_foros(activated: boolean): Observable<{ usuarios: any[], foros: any[] }> {
  return this.http.post<{ usuarios: any[], foros: any[] }>(`${this.api_http_rout}usuarios/getallusers`,{activated});
  }
 getComents(Id_Publicacion: number): Observable<{ Coments: { Contenido: string, Usuario_creador: string, Fecha_Comentario: string }[] }> {
  return this.http.post<{ Coments: { Contenido: string, Usuario_creador: string, Fecha_Comentario: string }[] }>(
    `${this.api_http_rout}foro/ObtenerComentarios`,
    { Id_Publicacion }
  );
  }
  crearComentario(comentario:Comentario){
    return this.http.post<{message:string}>(`${this.api_http_rout}foro/CrearComentario`,comentario)
  }
  nuevoChat(correoLog: string, correoRem: string, creadoEn: string): Observable<{ Id_Chat: number }> {
  return this.http.post<{ Id_Chat: number }>(`${this.api_http_rout}chats/nuevo`, {
    Correo_log: correoLog,
    Correo_rem: correoRem,
    Creado_en: creadoEn
  });
  }
  getUsuarios_Chats(Correo_log: string): Observable<{ Usuarios_list: { Nombre: string, Apellido_Pat: string, UltimoMensaje: string | null, FechaUltimoMensaje: string | null }[] }> {
  return this.http.post<{ Usuarios_list: { Nombre: string, Apellido_Pat: string, UltimoMensaje: string | null, FechaUltimoMensaje: string | null }[] }>(
    `${this.api_http_rout}chats/participantes`,
    { Correo_log }
  );
  }
  PostNuevoMensaje(Id_Chat:number, Contenido:string, Correo_log:string, Fecha_Envio:string){
    return this.http.post<{ Mensaje: "Mensaje enviado con exito" }>(`${this.api_http_rout}chats/mesagge`,{Id_Chat, Contenido, Correo_log, Fecha_Envio})
  }
  getmensajes(Id_Chat:number):Observable<{Mensajes:{Correo_emit:string, Contenido:string,Fecha_envio:string,nombre:string}[]}>{
    return this.http.post<{Mensajes:{Correo_emit:string, Contenido:string,Fecha_envio:string,nombre:string}[]}>(`${this.api_http_rout}chats/get_msj_chat`,{Id_Chat})
  }
  getUsuariosEnforo(Titulo_foro:string): Observable<{inscritos:{correo:string}[]}>{
    return this.http.post<{inscritos:{correo:string}[]}>( `${this.api_http_rout}foro/inscritos_foro`,{Titulo_foro})
  }
  postCrearPostgrp(post:Post){
    return this.http.post<{Mensaje:string}>(`${this.api_http_rout}Grupos/crearpost`, post)
  }
  recuperarPostgrp(Nombre_Grupo: string): Observable<{ posts: { Fecha_Publicacion: string, Contenido: string, Usuario_creador: string, Id_Publicacion:number  }[] }> {
  return this.http.post<{ posts: { Fecha_Publicacion: string, Contenido: string, Usuario_creador: string ,Id_Publicacion:number}[] }>(
    `${this.api_http_rout}Grupos/recuperarpost`,
    { Nombre_Grupo }
  );}
  postUnirCodigo(Codigo:string, Correo: string){
    return this.http.post(`${this.api_http_rout}Grupos/ingresar_cod`,{ Codigo, Correo })
  }
  getInfogrp(Nombre_Grupo: string) {
  return this.http.post<{ Clave_Grupo:string, Correo_Creador:string}>(`${this.api_http_rout}Grupos/data_gpr`,{ Nombre_Grupo });
  }
  getAlumnos(Nombre_Grupo:string): Observable<{inscritos:{correo:string, Nombre_Usuario:string}[]}>{
    return this.http.post<{inscritos:{correo:string,Nombre_Usuario:string}[]}>( `${this.api_http_rout}Grupos/get_alumnos`,{Nombre_Grupo})
  }
 postissuscribedgpr(Nombre_Grupo:string,correo_Usuario:string){
    return this.http.post<{issus:boolean}>(`${this.api_http_rout}Grupos/issuscribed`,{Nombre_Grupo,correo_Usuario})
  }
  postInscribirGrupo(Nombre_Grupo:string,correo_Usuario:string, Fecha_Union:string){
    return this.http.post<{Mensaje:string}>(`${this.api_http_rout}Grupos/inscribir_Grupo`,{Nombre_Grupo,correo_Usuario,Fecha_Union})
  }
  postDesinscribirGrupo(Nombre_Grupo:string,correo_Usuario:string){
    return this.http.post<{Mensaje:string}>(`${this.api_http_rout}Grupos/deinscribir_Grupo`,{Nombre_Grupo,correo_Usuario})
  }
}
