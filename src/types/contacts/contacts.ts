// a list of contacts returned by the search result

export interface Contacts {
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  __v: number;
  _id: string;
  profileColor: string;
  image: string;
}

export interface DirectMessagesContacts {
  firstName: string;
  lastName: string;
  username: string;
  profileColor: string;
  image: string;
  _id: string;
}
