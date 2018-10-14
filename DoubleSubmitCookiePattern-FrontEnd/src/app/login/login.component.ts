import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = { username: '', password: '' };
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  /**
   * login with user name and password
   */
  login() {
    this.http.post('http://localhost:3000/login', {
      username: this.user.username,
      password: this.user.password
    }).subscribe(
      res => {
        let response;
        response = res;
        console.log(res);
        this.cookieService.set('SessionID', response.sessionId);
        this.cookieService.set('csrf', response.csrftoken);
        this.router.navigate(['/user']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
