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
            private studentReqService: StudentServiceService) {
  }

  showModal = false;
  selectedDate: any;
  selectedTime: any;
  selectedFDate: any;
  timeSlots: any;
  bookedSlots:any;

  ngOnInit(): void {
    this.initBlogForm();
    this.timeSlots = SETTINGS.TIME_SLOTS
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

  onChangeDate(data:any): void {
    this.selectedFDate = data.toLocaleDateString('en-US', this.options).replace(/\//g, '-');
    this.studentReqService.getResponsesByDate({sessionDate:this.selectedFDate}).subscribe((res)=>{
this.bookedSlots = res.data;
console.log(this.bookedSlots)
    })
  }

  checkAvailable(slot:any): boolean {
    
if (this.bookedSlots) {
  for(let x=0; x < this.bookedSlots.length; x++){
    
if(this.bookedSlots[x].sessionTime === slot){
  console.log(this.bookedSlots[x]);;
  console.log(slot)
  
  return false
}
  }
}
return true
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
    console.log(slot)
    this.selectedTime = slot
  }

  submit(): void {
    console.log(this.selectedTime)
    this.requestForm.get('sessionTime')?.patchValue(this.selectedTime);
    this.requestForm.get('sessionDate')?.patchValue(this.selectedFDate);

  this.studentReqService.createResponse(this.requestForm.getRawValue()).subscribe(()=>{
    this.requestForm.reset();
    this.selectedDate = '';
    this.selectedFDate = '';
    this.selectedTime = '';
  
      console.log(this.requestForm.getRawValue())
  });
  
  }
}
