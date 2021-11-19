import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { catchError, map, Observable, of } from 'rxjs';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-gaurd';
import { RolesGuard } from 'src/auth/gaurds/roles.gaurd';
import { User, UserRole } from '../models/user.interface';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {


    constructor(
        private userService: UserService
    ){}

    @Post()
    create(@Body() user: User): Observable<User | Object> {

        return this.userService.create(user).pipe(
            map((user: User) => user),
            catchError(err => of({error: err.message}))
        )
    }

    @Post('/login')
    login(@Body() user: User): Observable<Object> {

        return this.userService.login(user).pipe(
            map((jwt: string) => {
                return {access_token: jwt}
            }),
        )
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    findAll(): Observable<User[]>{
        return this.userService.findAll()
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param() Params): Observable<any> {
        return this.userService.findOne(Params.id)
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    deleteOne(@Param('id') id: string):Observable<any> {
        return this.userService.deleteOne(Number(id))
    }

    @hasRoles(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {

        return this.userService.updateOne(Number(id), user)
    }

}
