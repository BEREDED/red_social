import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { foros, Usuario, Usuario_ini } from '../modelos/modelosinfo.models';
import { Post } from '../modelos/Post.interface';

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
  return this.http.post<{ autenticado: boolean, token?: string }>(`${this.api_http_rout}usuarios/login`, us_ini);
}

}
