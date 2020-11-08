import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewportScroller } from '@angular/common';

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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  title: string = 'PetAdopt';

  user;
  loading: boolean = true;
  private querySubscription: Subscription;

  constructor(
    private viewportScroller: ViewportScroller,
    private apollo: Apollo
  ) {}

  ngOnInit(): void {
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

  handleSearchClick(): void {
    this.viewportScroller.scrollToAnchor('featured');
  }
}
