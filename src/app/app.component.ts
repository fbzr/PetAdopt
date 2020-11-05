import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_USER = gql`
  query GetUser {
    user {
      id
      name
      email
    }
  }
`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'PetAdopt';
  loading: boolean = true;
  user;

  constructor(private apollo: Apollo) {
    console.log('app constructor');
  }

  ngOnInit() {
    console.log('app init');
    try {
      this.apollo
        .watchQuery<any>({
          query: GET_USER,
        })
        .valueChanges.subscribe(({ data, loading }) => {
          this.loading = loading;
          this.user = data.user;
          console.log('set user with user data:\n', data.user);
        });
    } catch (error) {
      console.log('error\n', error.message);
    }
  }
}
