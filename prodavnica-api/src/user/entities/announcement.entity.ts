import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../category/entities/category.entity";

@Entity()
export class Announcement{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Category, category => category.announcements)
    category: Category;

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
        nullable: false
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