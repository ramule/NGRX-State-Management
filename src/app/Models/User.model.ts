export interface User {
  id: number;
  name: string;
  email: string;
  address: Address;
  username: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: number;
  geo: Geo
}

interface Geo {
  lat: string;
  lng: string;
}
