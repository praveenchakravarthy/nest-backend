import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { match } from 'assert';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private authService: AuthService
    ){}

    create(user: User): Observable<User> {

        return this.authService.hashPassword(user.password).pipe(
            switchMap((passwordhash: string) => {

                const newUser = new UserEntity();
                newUser.name = user.name;
                newUser.email = user.email;
                newUser.password = passwordhash;
                newUser.role = user.role;

                return from(this.userRepository.save(newUser)).pipe(
                    map((user: User) => {

                        const {password, ...result} = user;

                        return result;
                    }),
                    catchError(err => throwError(err))
                )
            })
        )

        // return from(this.userRepository.save(user));
    }

    findAll(): Observable<User[]> {
        return from(this.userRepository.find()).pipe(
            map((user:User[]) => {

                user.forEach(function (v) {delete v.password});

                return user

            })
        )
    }

    findOne(id: number): Observable<any> {

        return from(this.userRepository.findOne(id))
    }

    deleteOne(id: number): Observable<any> {
        return from(this.userRepository.delete(id))
    }

    updateOne(id: number, user: User): Observable<any> {
        delete user.email;
        delete user.password;
        return from(this.userRepository.update(id, user))
    }

    login(user: User): Observable<string>{

        return this.validateUser(user.email, user.password).pipe(
            switchMap((user: User) => {
                if(user){
                    return this.authService.generateJWT(user).pipe(
                        map((jwt: string) => jwt)
                    )

                } else {
                    throw Error
                }
            })
        )

    }

    validateUser(email: string, password: string): Observable<User>{

        return this.findByMail(email).pipe(
            switchMap((user: User) => this.authService.comparePasswords(password , user.password).pipe(
                map((match: boolean | any) => {
                    if(match){
                        const {password, ...result} = user;
                        return result;

                    }else {
                        throw Error
                    }
                })
            )
            )
        )

    }

    findByMail(email: string): Observable<User>{

        return from(this.userRepository.findOne({email}));

    }

}
