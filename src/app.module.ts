import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// inicializamos typeorm
import { TasksModule } from './tasks/tasks.module';
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/tasks.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Task } from './tasks/entity/Task';
 
@Module({
  imports: [TasksModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'typeorm',
    entities: [Task],
    synchronize: true,
  }),TypeOrmModule.forFeature([Task])],
  controllers: [AppController, TasksController],
  providers: [AppService, TasksService],
})  
export class AppModule {}    
   