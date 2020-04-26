import { Injectable, HttpStatus, HttpException, HttpService } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey'
        })
    }

    async validate(payload: any, done: VerifiedCallback){
        const user = await this.authService.validateuser(payload)
        if(!user){
            return done(
                new HttpException('Unauthorized Access',HttpStatus.UNAUTHORIZED),
                false
            )
        }
        return done(null,user, payload.iat)
    }
}