import { Component } from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzCardComponent} from "ng-zorro-antd/card";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzColDirective,
    NzFormItemComponent,
    NzInputDirective,
    NzFormControlComponent,
    NzFormLabelComponent,
    NzFormDirective,
    NzOptionComponent,
    NzSelectComponent,
    NzDatePickerComponent,
    NzCardComponent,
    NzRowDirective,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

}
