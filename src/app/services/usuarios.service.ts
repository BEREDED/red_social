import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { foros, Usuario, Usuario_ini, Usuario_rec, Post } from '../modelos/modelosinfo.models';
import { Usu_actulizar } from '../modelos/us_actulizar';
import { Token } from '@angular/compiler';

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
  postCreacionForo(foro:foros){
    return this.http.post(`${this.api_http_rout}foros`, foro);
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
 Postsoldata() {
  return this.http.get<any>(`${this.api_http_rout}usuarios/datosUs`);
}
}
