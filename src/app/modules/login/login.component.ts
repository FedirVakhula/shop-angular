import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(name: string, password: string): void {
    if (this.authService.checkUserIsAdmin(name, password)) {
      this.authService.isAdmin ?
        this.router.navigate(['/admin']) : this.router.navigate(['/products']);
    } else {
      alert('You are not registared!!!');
    }
  }

}
