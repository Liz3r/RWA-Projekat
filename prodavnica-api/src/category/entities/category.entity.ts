import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "../../announcement/entities/announcement.entity";

@Entity()
export class Category{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        nullable: false,
        length: 25
    })
    categoryTitle: string;

    @OneToMany(type => Announcement, announcement => announcement.category)
    announcements: Announcement[];
}