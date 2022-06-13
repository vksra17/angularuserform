import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(public http: HttpClient) { }
   
  postData(data:any){
    return this.http.post<any>("http://localhost:5000/productData/",data)
  }
  getData(){
    return this.http.get<any>("http://localhost:5000/productData/")
  }
  updateData(data:any,id:String){
    return this.http.put<any>("http://localhost:5000/productData/"+id,data)
  }
  deletedData(id:number){
    return this.http.delete<any>("http://localhost:5000/productData/"+id)
  }
}
