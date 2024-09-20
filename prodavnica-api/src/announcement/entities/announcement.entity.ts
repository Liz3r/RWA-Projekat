import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "../../category/entities/category.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Announcement{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Category, category => category.announcements)
    //@JoinColumn({name: 'categoryId'})
    category: Category;

    @ManyToOne(type => User, user => user.announcements)
    //@JoinColumn({name: 'userId'})
    user: User;

    //@Column()
    //userId: number;

    //@Column()
    //categoryId: number;

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
        length: 100
    })
    picture: string;
}