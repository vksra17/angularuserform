import { Component, Inject, Injectable, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {ApiService} from "../services/api.service";
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  userform !: FormGroup;
  submitted: Boolean=false;
  actionBtn: String="Save"

  constructor(public formbuilder:FormBuilder,
    private router:Router, @Inject(MAT_DIALOG_DATA) public editData:any,
    private api:ApiService, public dialogRef:MatDialogRef<ButtonComponent>) { }


  ngOnInit(): void {
    this.userform = this.formbuilder.group({
        name:["",[Validators.required]],
        number:["",[Validators.required]],
        email:["",[Validators.required]],
      select:["",[Validators.required]]
    });
    if(this.editData){
        this.actionBtn ="Update"
        this.userform.controls['name'].patchValue(this.editData.name);
        this.userform.controls['number'].patchValue(this.editData.number);
        this.userform.controls['email'].patchValue(this.editData.email);
        this.userform.controls['select'].patchValue(this.editData.select);
    }
  }
// onSubmit(){
// if(this.userform.valid){
//   this.api.postData(this.userform.value).subscribe({next:(res)=>{
//      this.dialogRef.close();
//      setTimeout(()=>{alert("successfully stored data")},1000)
//   }})
// }
// }
afterSave(){
 if(!this.editData){
  if(this.userform.valid){
    this.api.postData(this.userform.value).subscribe({next:(res)=>{
       this.dialogRef.close("save");
       setTimeout(()=>{alert("successfully stored data")},1000)
    }})
  }
 }else{
  this.updateData();
}
  this.router.navigate(["/"]);
}
updateData(){
  this.api.updateData(this.userform.value,this.editData.id).subscribe({next:(res)=>{
    this.userform.reset();
    this.dialogRef.close("update");
    setTimeout(()=>{alert("successfully updated data")},1000)
 }})
}

}
