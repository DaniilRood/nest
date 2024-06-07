export class CreateUserDto {
  email: any;
  password(
    password: any,
    password1: (password: string, password1: any) => void,
  ) {
    throw new Error('Method not implemented.');
  }
}
