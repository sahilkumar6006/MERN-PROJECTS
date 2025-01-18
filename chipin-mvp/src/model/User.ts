export default interface User {
  id: string;
  aud: string;
  role?: string;
  email?: string;
  phone?: string;
  user_metadata: UserMetadata;
}

export interface UserMetadata {
  avatar?: string;
  email?: string;
  full_name?: string;
}
