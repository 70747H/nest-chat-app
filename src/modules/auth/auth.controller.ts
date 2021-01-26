import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthCredentialsDto} from './dto/auth-credentials.dto';

/**
 * Auth controller
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  /**
   * SignUp a user with his email and password
   * @body AuthCredentialsDto User email and password
   */
  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  /**
   * SignIn a user with his email and password
   * @body AuthCredentialsDto User email and password
   */
  @Post('/signin')
  signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
