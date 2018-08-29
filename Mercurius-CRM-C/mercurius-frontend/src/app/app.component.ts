import { Component } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mercurius';
  public loggedUser: User;
  ngOnInit() {
    //Si existe token valido en el localStorage, extraer el usuario logueado del localStorage
    if (this.loggedIn()) {
      this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    }
  }

  /**
   * [Metodo que verifica si el token existe y si existe verifica si ya paso el tiempo de expiración]
   */
  loggedIn() {
    return tokenNotExpired();
  }

  /**
   * Metodo para hacer logOut, eliminar el objecto loggedUser y token del localStorage
   */
  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
  }
  /**
   * Evento que se ejecuta cuando el componente de login retorna el usuario logueado
   * @param {User} loggedUser [description]
   */
  onLogin(loggedUser: User): void {
    this.loggedUser = loggedUser;
  }

}
