import { Component, Input, OnInit, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
//, DoCheck 
export class TasklistComponent implements OnInit, OnChanges{
  // at the time of initialization the inpt value will be true then changes to false
  // demo implementation of parent to child communication
  @Input()inpt:boolean=false
  
  allTask:any

  constructor(private service:TaskService){

  }

  ngOnInit(): void {
    this.service.listTask().then((res:any)=>res.json()).then(data=>this.allTask=data).catch(err=>alert(err))
  }

  ngOnChanges(): void {
    
    if(this.inpt){
      console.log(this.inpt);
      this.service.listTask().then((res:any)=>res.json()).then(data=>this.allTask=data).catch(err=>alert(err))
    }
    
  }

  /* ngDoCheck(): void {
    this.service.listTask().then((res:any)=>res.json()).then(data=>this.allTask=data)
  } */

  deleteTask(id:number){
    this.service.removeTask(id).then((res:any)=>this.ngOnChanges())
  }
}
