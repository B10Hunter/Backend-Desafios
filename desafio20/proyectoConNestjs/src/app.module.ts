import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({//base de datos
  imports: [UsersModule, MongooseModule.forRoot('mongodb+srv://Lucas:Lucasb10@proyecto-backend-coderh.llkhfym.mongodb.net/ProyectoBackend?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
