import { Announcement } from "src/announcement/entities/announcement.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => Announcement, announcement => announcement.user)
    announcements: Announcement;

    @Column({
        unique: true,
        nullable: false,
        length: 25
    })
    user_email: string;

    @Column({
        nullable: false
    })
    user_password: string;

    @Column({
        nullable: false,
        length: 12
    })
    first_name: string;

    @Column({
        nullable: false,
        length: 12
    })
    last_name: string;

    @Column({
        nullable: true
    })
    bio: string;

    @Column({
        nullable: true,
        length: 20
    })
    phone_number: string;

    @Column({
        nullable: true,
        length: 20
    })
    country: string;

    @Column({
        nullable: true,
        length: 20
    })
    city: string;
    @Column({
        nullable: true
    })
    address: string;
}
