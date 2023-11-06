// Role (name)
//User (Name+Address+Image, email, password)

export type IRole = {
  name: string;
};

export type IName = {
  first: string;
  middle: string;
  last: string;
};

export type IAddress = {
  state: string;
  country: string;
  city: string;
  street: string;
  houseNumber: string;
};

export type IImage = {
  url: string;
  alt: string;
};

export type IUser = {
  name: IName;
  isBusiness: boolean;
  phone: string;
  email: string;
  password: string;
  image: IImage;
  address: IAddress;
};


