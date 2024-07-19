import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { ConnectOptions } from "typeorm";


export const typeormConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    port: 3306,
    host: 'localhost',
    username: 'root',
    password: 'admin',
    database: 'rwadb',
    entities: [User],
    synchronize: true
  }