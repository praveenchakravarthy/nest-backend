import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { catchError, map, Observable, of } from 'rxjs';
import { hasRoles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/gaurds/jwt-gaurd';
import { RolesGuard } from 'src/auth/gaurds/roles.gaurd';
import { UserRole } from 'src/user/models/user.interface';
import { Customer } from '../models/customer.interface';
import { CustomerService } from '../service/customer.service';

@Controller('customer')
export class CustomerController {

    constructor( private customerService: CustomerService){}

    @hasRoles(UserRole.ADMIN,UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    create(@Body() customer: Customer): Observable<Customer| Object> {
        return this.customerService.create(customer).pipe(
            map((customer: Customer) => customer),
            catchError(err => of({error: err.message}))
        )
    }

    @hasRoles(UserRole.ADMIN,UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':id')
    findOne(@Param() Param): Observable<any> {
        return this.customerService.findOne(Param.id)
        
    }

    @hasRoles(UserRole.ADMIN,UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    findAll(): Observable<any[]> {
        return this.customerService.findAll()
    }

    @hasRoles(UserRole.ADMIN,UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    deleteOne(@Param() param): Observable<any> {
       return this.customerService.deleteOne(param.id)
    }

    @hasRoles(UserRole.ADMIN,UserRole.USER)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id')
    updateOne(@Param('id') id: string, @Body() customer: Customer): Observable<any> {
        return this.customerService.updateOne(Number(id),customer)
    }

}
