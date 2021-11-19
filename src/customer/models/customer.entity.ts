import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CustomerEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    address: string;

    @Column()
    mobileNo: string

}