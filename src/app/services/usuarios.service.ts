import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { foros, Usuario, Usuario_ini, Usuario_rec, Post } from '../modelos/modelosinfo.models';
import { Usu_actulizar } from '../modelos/us_actulizar';
import { getdata } from '../modelos/getdata.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  api_http_rout = 'http://localhost:3000/';

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
  getInfoForo(Titulo_foro:string){
    return this.http.post<{Descripcion:string}>(`${this.api_http_rout}foro/getdata`, { Titulo_foro } );
  }
  postCreacionForo(foro:foros){
    return this.http.post(`${this.api_http_rout}foro/create_foro`, foro);
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
  return this.http.post<{namedb:string}>(`${this.api_http_rout}usuarios/get_data`,correo);
  }
  postissuscribed(Titulo_foro:string,correo_Usuario:string){
    return this.http.post<{issus:boolean}>(`${this.api_http_rout}foro/issuscribed`,{Titulo_foro,correo_Usuario})
  }
}
