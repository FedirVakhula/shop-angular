import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/core/models/config-options';
import { UserCart } from 'src/app/interface/products';
import { ApiCartService } from 'src/app/services/api-cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private apiCartService: ApiCartService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogin(name: string, password: string): void {

    this.authService.getUsers()
      .pipe(
        map((users: User[]) => users.find((user: User) => user.login === name && user.password === password)),
        tap((user: User) => {
          if (!user) {
            alert('You are not registared!!!');
          }
        }),
        filter((user: User) => Boolean(user)),
        switchMap((user: User) => forkJoin([
          of(user),
          this.apiCartService.getCart(user.id)
        ]))
      ).subscribe(([user, cart]: [User, UserCart]) => {
        this.cartService.cartId = cart.id;
        this.cartService.cartProducts = cart.items;
        this.authService.checkUserIsAdmin(user) ?
          this.router.navigate(['/admin']) : this.router.navigate(['/products']);
      });
  }

}
