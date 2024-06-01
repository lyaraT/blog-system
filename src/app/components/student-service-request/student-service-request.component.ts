import {Component, OnInit} from '@angular/core';
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {NzUploadComponent} from "ng-zorro-antd/upload";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {FileService} from "../../core/services/file.service";
import {BlogService} from "../../core/services/blog.service";
import {AuthService} from "../../core/services/auth.service";
import {NzModalComponent, NzModalContentDirective, NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {NzDatePickerComponent, NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {SETTINGS} from "../../core/constants/common.settings";
import { StudentServiceService } from '../../core/services/student-service.service';
import { SlotService } from '../../core/services/slot.service';
import { NzMessageModule } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-student-service-request',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NzButtonComponent,
    NzIconDirective,
    NzPopconfirmDirective,
    NzUploadComponent,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzMessageModule,
    NzModalComponent,
    NzModalModule,
    NzModalContentDirective,
    NzDatePickerComponent,
    FormsModule,
    CommonModule
  ],
  providers: [

  ],
  templateUrl: './student-service-request.component.html',
  styleUrl: './student-service-request.component.css'
})
export class StudentServiceRequestComponent implements OnInit {
  files: any[] = [];
  pdf: any[] = [];
  requestForm!: FormGroup;
  user: any;
  showPdf = false;
  options = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  };

  constructor(private msg: NzMessageService, private filesService: FileService
    , private formBuilder: FormBuilder, private blogService: BlogService,
              private authService : AuthService, private modalService: NzModalService,
            private studentReqService: StudentServiceService,private slotService:SlotService,
          private message: NzMessageService) {
  }

  showModal = false;
  selectedDate = new Date();
  selectedTime:any;
  selectedFDate: any;
  timeSlots: any;
  selectedSlot:any;
  bookedSlots:any;

  ngOnInit(): void {
    this.initBlogForm();
    this.timeSlots = SETTINGS.TIME_SLOTS
    this.getData();
  }

  initBlogForm(): void {
    this.requestForm = this.formBuilder.group({
      studentId: [null, Validators.compose([Validators.required])],
      sessionDate: [null, Validators.compose([Validators.required])],
      sessionTime: [null, Validators.compose([Validators.required])],
    });

  }
  showModalF(): void {
    this.showModal = true;
  }

  getData(): void {
    this.slotService.getSlotsPaged({date:this.selectedDate.toISOString().split('T')[0],searchValue:'ddd'}).subscribe((res)=>{
      this.bookedSlots = res;
      console.log(this.bookedSlots)
          })
  }

  onChangeDate(data:any): void {
    this.selectedDate = data
    this.getData();
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.showModal = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.showModal = false;
  }

  setSlot(slot : any): void {
    console.log(slot);
    
    this.selectedFDate = this.selectedDate.toISOString().split('T')[0];
    this.selectedSlot = slot.id;
    this.selectedTime = `${new Date(slot.startTime).toLocaleTimeString()} - ${new Date(slot.endTime).toLocaleTimeString()}`;
  }

  submit(): void {

    if ((this.selectedTime && this.selectedTime.length > 1) && (this.selectedFDate && this.selectedFDate.length > 1)) {
    console.log('its in')
    this.requestForm.get('sessionTime')?.patchValue(this.selectedTime);
    this.requestForm.get('sessionDate')?.patchValue(this.selectedFDate);

  this.studentReqService.createResponse(this.requestForm.getRawValue()).subscribe(()=>{
    this.requestForm.reset();
    this.selectedDate = new Date();
    this.selectedFDate = '';
    this.selectedTime = '';
    this.message.success('Slot Booked Successfully');
  this.slotService.updateSlot({id:this.selectedSlot}).subscribe(()=>{
    this.ngOnInit();
  })
      console.log(this.requestForm.getRawValue())
  });
} else {
this.message.info('Select a booking slot !');
}
  }
}
