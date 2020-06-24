import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id:string

    @Column({type:"varchar",length:50, unique:true})
    title:string

    @Column({type:"varchar",length:50})
    description:string

    @Column({type:"varchar",length:50})
    imagePath:string
}