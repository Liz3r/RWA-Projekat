import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Announcement{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: false,
        nullable: false,
        length: 25
    })
    title: string;

    @Column({
        unique: false,
        nullable: false,
        length: 25
    })
    description: string;

    @CreateDateColumn({
        nullable: false,
        unique: false
    })
    datePosted: Date;

    @Column({
        unique: false,
        nullable: false,
        length: 25
    })
    price: number;

    @Column({
        unique: false,
        nullable: false,
        length: 25
    })
    currency: string;

    @Column({
        unique: false,
        nullable: false,
        length: 25
    })
    condition: string;

    @Column({
        unique: true,
        nullable: false,
        length: 25
    })
    picture: string;
}