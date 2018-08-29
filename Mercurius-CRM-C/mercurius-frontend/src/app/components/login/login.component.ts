import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { AuthService, Constants } from '../../services/index';
import { User } from '../../models/index';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  public user: User;
  public errorMessage: String;
  @Output()
  login = new EventEmitter<User>();


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = new User(
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }

  onLogin(): void {
      //console.log("this.user",this.user);
    this.authService.login(this.user).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('company', JSON.stringify(data.company));
        this.user.id = data.user.id;
        this.user.firstname = data.user.firstname;
        this.user.lastname = data.user.lastname;
        this.user.email = data.user.email;
        this.user.username = data.user.username;
        this.user.password = null;
        this.user.creationDate = data.user.creationDate;
        this.user.modificationDate = data.user.modificationDate;
        localStorage.setItem('loggedUser', JSON.stringify(this.user));
        localStorage.setItem('sugarId', data.id);
        localStorage.setItem('sugar_userId', data.api_user_id);
        localStorage.setItem('sugar_userName',data.api_user_name);
        this.emitLoggedUser(this.user);
      }, errorResponse => {
        console.log(errorResponse);
        let body = JSON.parse(errorResponse._body);
        if (body.code) {
          this.errorMessage = body.message
          console.log("ERROR", body.message);
        }
      })
  };

  emitLoggedUser(user: User): void {
    this.login.emit(user);
  }



}
