import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { Task } from './entity/Task';
import { Repository } from 'typeorm';
import { taskDto } from './model/task.interface';
import {unlink} from 'fs-extra'
import {resolve} from 'path'

@Injectable()
export class TasksService {

    constructor(@InjectRepository(Task) private taskReposity:Repository<Task>){

    }

    async getTasks():Promise<Task[]>{
        return await this.taskReposity.find();
    }

    async getOneTasks(id):Promise<Task>{
        return await this.taskReposity.findOneOrFail(id)
    }

    async saveTask(task){
        try{
            await this.taskReposity.save(task)
        }catch(err){
            console.log(err)
        }
       
    }
     async deleteTask(id:number){
       const task = await this.taskReposity.findOneOrFail(id);
       await this.taskReposity.delete(id);
       await unlink(resolve('./dist/public'+task.imagePath))
     }

     async updatetask(id:number, task){
        const taskfound = await this.taskReposity.findOneOrFail(id);
        await unlink(resolve('./dist/public'+taskfound.imagePath));
          
        if(taskfound){
            const newTask = await this.taskReposity.merge(taskfound,task)  
            return  await this.taskReposity.save(newTask)
        }else{
            return "no existe data"
        }
       
     }
}
