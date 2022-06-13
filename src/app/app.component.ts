import { Component, ViewChild , OnInit,AfterViewInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ButtonComponent } from './button/button.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit{
  title = 'app';
 
  displayedColumns: string[] = [ "id",'name', 'number', "email","select","Action"];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public dialog: MatDialog, private api:ApiService) {}
 ngOnInit():void{
 this.getAllData();
 }
 ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}
  openDialog() {
   this.dialog.open(ButtonComponent,{width:"50%"}).afterClosed().subscribe(val=>{
    if(val=="save")
    this.getAllData()
  })
   }
  
  
  getAllData(){
    this.api.getData().subscribe({next:(res)=>{
       this.dataSource =  new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }})
}
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  edit(row:any){
    this.dialog.open(ButtonComponent,{
   width:"50%",
      data:row
    }).afterClosed().subscribe(val=>{
      if(val=="update")
      this.getAllData()
    })
  }
  delete(id:number){
   this.api.deletedData(id).subscribe({next:(res)=>{
       this.getAllData();
      setTimeout(() => {
        alert("Deleted successsfully")
      }, 2000);
  }
 })
     
  }
} 
