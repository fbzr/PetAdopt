export class Pet {
  id: number;
  organization_id: string;
  url: string;
  type: string;
  species: string;
  breeds: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  age: string;
  gender: string;
  size: string;
  coat: string;
  attributes: {
    spayed_neutered: Boolean;
    house_tranined: Boolean;
    declawed: Boolean;
    special_needs: Boolean;
    shots_current: Boolean;
  };
  environment: {
    children: Boolean;
    dogs: Boolean;
    cats: Boolean;
  };
  name: string;
  description: string;
  photos: Array<Object>;
  primary_photo_cropped: {
    small: string;
    medium: string;
    large: string;
    full: string;
  };
  videos: string[];
  status: string;
  contact: {
    email: string;
    phone: string;
    address: {
      address1: string;
      address2: string;
      city: string;
      state: string;
      postcode: string;
      country: string;
    };
  };

  constructor() {}
}
