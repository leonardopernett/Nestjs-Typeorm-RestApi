import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Req,
  Res,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  Query
} from '@nestjs/common';

import {diskStorage} from 'multer'
import { TasksService } from './tasks.service';
import { Response, Request } from 'express';
import { taskDto } from './model/task.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import {resolve, extname} from 'path'

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
     getTask() {
    return this.taskService.getTasks();
    
  }
  @UseInterceptors(FileInterceptor('image',{ storage:diskStorage({
    destination:resolve('./dist/public/uploads'),
    filename:(req, file, cb)=>{
        cb(null, Date.now()+extname(file.originalname))
    } 
   })
}))
  @Post('/create')
  @HttpCode(200)
  async savetask(@Body() task: taskDto, @Res() res: Response, @UploadedFile() image) {
    const img = '/uploads/'+image.filename
    const {title, description} = task
    const newTask ={
        title,
        description,
        imagePath:img
    }
    await this.taskService.saveTask(newTask)
    return res.json({ message: 'task saved'});
  }
  @Get(':id')
  async getOneTask(@Param('id') id) {
      return await this.taskService.getOneTasks(id);
  }

  @UseInterceptors(FileInterceptor('image',{ storage:diskStorage({
    destination:resolve('./dist/public/uploads'),
    filename:(req, file, cb)=>{
        cb(null, Date.now()+extname(file.originalname))
    } 
   })
}))

  @Put(':id/edit')
  updateTask(@Param('id') id:number,@Body() task:taskDto,@UploadedFile() Image, @Res() res:Response) {
     const img = '/upload/'+Image.filename
     const {title, description}= task
     const newTask ={
         title,
         description,
         imagePath:img
     }
    this.taskService.updatetask(id, task)
     return res.json({
         message:'task update'
     })
  }
  
  @Delete('/delete')
  deleteTask(@Query('taskId') taskId) {
     this.taskService.deleteTask(taskId);
     return {
         message:'task deleted'
     } 
  } 
}
