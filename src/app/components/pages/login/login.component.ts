import { Component, OnInit } from '@angular/core';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { UserService } from '../../../services/user.service';
import {environment} from '../../../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  faFacebook = faFacebook;
  faGoogle = faGoogle;

  readonly facebookAuthUrl: string = `${environment.PETADOPT_API}/auth/facebook`

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  handleLogin(platform: string) {
    this.userService.login(platform).subscribe((data) => {
      console.log('return of test', data);
    });
  }
}
