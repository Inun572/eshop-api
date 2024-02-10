export interface RegisterData {
  fullname: string;
  username: string;
  email: string;
  password: string;
  address: string;
  roleId: number;
}

export interface UpdateDataUser extends RegisterData {
  isActive: boolean;
}
