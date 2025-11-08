export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  fullName: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user: User;
    token: string;
  };
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export interface SignupData {
  name: string;
  email: string;
  phone: string;
  state: string;
  localGov: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
  location?: string;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
}
