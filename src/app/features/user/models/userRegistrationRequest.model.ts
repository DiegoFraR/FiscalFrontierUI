export interface UserRegistrationRequest{
  userCreationRequestId: number,
  email: string,
  firstName: string,
  lastName: string,
  address: string,
  dateOfBirth: Date,
}