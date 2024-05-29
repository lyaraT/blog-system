import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCardModule } from 'ng-zorro-antd/card';
import {NzButtonComponent} from "ng-zorro-antd/button";
import { NzModalModule } from 'ng-zorro-antd/modal';
import {NzUploadChangeParam, NzUploadComponent, NzUploadXHRArgs} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMessageService} from "ng-zorro-antd/message";
import {FileService} from "../../../core/services/file.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BlogService} from "../../../core/services/blog.service";
import {AuthService} from "../../../core/services/auth.service";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {CommonModule} from "@angular/common";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { SlotService } from '../../../core/services/slot.service';


@Component({
  selector: 'app-slot-allocation',
  standalone: true,
  imports: [NzCalendarModule,CommonModule,NzCardModule,NzButtonComponent,NzModalModule,ReactiveFormsModule,NzDatePickerModule,NzTimePickerModule],
  templateUrl: './slot-allocation.component.html',
  styleUrl: './slot-allocation.component.css'
})
export class SlotAllocationComponent implements OnInit {

  isVisible = false;
  slotForm!: FormGroup;
  dateValue = new Date();
  slots:any;


  ngOnInit(): void {
    this.initSlotForm();
this.getSlots();
  }

  getSlots(): void {
      this.slotService.getSlotsPaged({date:this.dateValue.toISOString().split('T')[0]}).subscribe((res)=>{
        console.log(res);
        
      this.slots = res;
    })
  }

  constructor(private msg: NzMessageService, private filesService: FileService
    , private formBuilder: FormBuilder, private slotService:SlotService) {}

    initSlotForm(): void {
      this.slotForm = this.formBuilder.group({
        date: [null, Validators.compose([Validators.required])],
        startTime: [null, Validators.compose([Validators.required])],
        endTime: [null, Validators.compose([Validators.required])],
        description: [null, Validators.compose([Validators.required])],
        type: [null, Validators.compose([Validators.required])],
        available: [true],
      });
    }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.submit();
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  onValueChange(value: Date): void {
    this.dateValue = value;
    this.getSlots();
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }

  submit():void {
  this.slotForm.get('date')?.patchValue(this.dateValue.toISOString().split('T')[0]);

  console.log(this.slotForm.getRawValue());

  this.slotService.createSlot(this.slotForm.getRawValue()).subscribe(()=>{
    this.msg.create('success','Slot Created');
    this.slotForm.reset();
    this.ngOnInit();
  });

  }

  delete(id:any): void {
this.slotService.deleteSlotById(id).subscribe(()=>{
  this.ngOnInit();
})
  }

}
