export interface IRequestMePatch {
  avatar?: any;
  name?: string;
  email?: string;
}

export interface IResponceMeGet {
  avatar: string;
  id: string;
  email: string;
  isEmailVerified: boolean;
  name: string;
  created: string;
  updated: string;
}

export interface IRequestResetPassword {
  token: string;
  password: string;
}
