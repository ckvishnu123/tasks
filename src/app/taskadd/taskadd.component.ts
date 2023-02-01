import { Component, EventEmitter, Output } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-taskadd',
  templateUrl: './taskadd.component.html',
  styleUrls: ['./taskadd.component.css']
})
export class TaskaddComponent {
  // child to parent
  @Output()notify:EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private service:TaskService){

  }

  taskForm = new FormGroup({
    "task_name": new FormControl("", [Validators.required])
  })

  get task_name(){
    return this.taskForm.get("task_name")
  }
  createTask(){
    this.notify.emit(false)
    let data = this.taskForm.value
    // .catch bcoz else case will work here, that will handle error
    this.service.addTask(data).then((res:any)=>res.json()).then(data=>{
      console.log("Task created !!!")
      this.notify.emit(true)
    }).catch(err=>alert(err))
}
}