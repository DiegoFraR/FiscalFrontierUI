export interface AddUserRegistrationRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  dateOfBirth: Date;
  securityQuestion1Id: number;
  securityQuestion1Answer: string;
  securityQuestion2Id: number;
  securityQuestion2Answer: string;
}