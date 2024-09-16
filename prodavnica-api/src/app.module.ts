import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AnnouncementController } from './announcement/announcement.controller';
import { AnnouncementService } from './announcement/announcement.service';
import { AnnouncementModule } from './announcement/announcement.module';
import { Announcement } from './user/entities/announcement.entity';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      host: 'localhost',
      username: 'root',
      password: 'admin',
      database: 'rwadb',
      entities: [User, Announcement],
      synchronize: true
    }),
    UserModule,
    AnnouncementModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
