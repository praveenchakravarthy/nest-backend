import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { AuthService } from 'src/auth/service/auth.service';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../models/customer.entity';
import { Customer } from '../models/customer.interface';

@Injectable()
export class CustomerService {

    constructor(
        @InjectRepository(CustomerEntity) private readonly customerRepository: Repository<CustomerEntity>,
        private authService: AuthService
    ){}


    create(customer: Customer): Observable<Customer> {
        return from(this.customerRepository.save(customer))
    }

    findOne(id: number): Observable<any> {
        return from(this.customerRepository.findOne(id))
    }

    findAll(): Observable<any> {
        return from(this.customerRepository.find())
    }

    deleteOne(id: number): Observable<any> {
        return from(this.customerRepository.delete(id))
    }

    updateOne(id: number, customer: Customer): Observable<any> {
        return from(this.customerRepository.update(id, customer))
    }

}
