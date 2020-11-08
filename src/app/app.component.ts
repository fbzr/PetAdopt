import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const GET_USER = gql`
  query GetUser {
    user {
      name
    }
  }
`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'PetAdopt';
  loading: boolean = true;
  user;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo) {
    console.log('app constructor');
  }

  ngOnInit() {
    console.log('app init');
    try {
      this.querySubscription = this.apollo
        .watchQuery<any>({
          query: GET_USER,
          errorPolicy: 'all',
        })
        .valueChanges.subscribe(({ data, loading }) => {
          this.loading = loading;
          this.user = data.user;
          console.log('set user with user data:\n', data.user);
        });
    } catch (error) {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.querySubscription.unsubscribe();
  }
}
