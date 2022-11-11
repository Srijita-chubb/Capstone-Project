import { Component, OnInit } from '@angular/core';
import { user } from 'src/Utilities/user';
import { UserserviceService } from '../services/userservice.service';
import { constant } from 'src/Utilities/constant';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name: string = "";
  phone: string = "";
  email: string = "";
  password: string = "";
  l_email: string = "";
  l_password: string = "";
  i:any;
  flag: boolean = false;

  constructor(private router:Router, private uservice:UserserviceService) { }
  arr:user[]=[];

  ngOnInit(): void {
    this.uservice.getAllUsers().subscribe((response:any) => {
      console.log(response,'home')
      this.arr = response;
    })
    
  }
  onSignup(name:string, phone:string, email:string, password:string){
    console.log(name);
    console.log(phone);
    console.log(email);
    console.log(password);
    if(name!=="" && phone!=="" && email!=="" && password!==""){
      let temp:user={U_ID:0,U_NAME:"",U_PHONENO:"",u_MAILID:"",u_PASSWORD:""}
      temp.U_NAME=name;
      temp.U_PHONENO=phone;
      temp.u_MAILID=email;
      temp.u_PASSWORD=password;
      this.uservice.addUser(temp).subscribe((data:any)=>{
        console.log(data)
      })
      this.router.navigate(['/','']);
    }
  }

  onLogin(l_email: string, l_password: string){
  
      if(l_email == "admin1@gmail.com" || l_email == "admin2@gmail.com")
      {
        this.router.navigate(['/','adminhome']);
      } 

    else 
    {
    
      for(this.i=0; this.i<this.arr.length; this.i++){
        console.log(this.arr.length);
        console.log(this.arr[this.i].u_MAILID);
        console.log(this.arr[this.i].u_PASSWORD);
        console.log(l_email);
        console.log(l_password);
  
        if(l_email == this.arr[this.i].u_MAILID && l_password == this.arr[this.i].u_PASSWORD){
          this.flag = true;
          console.log(this.arr[this.i].u_MAILID);
          break;
        }
      }
      console.log(this.flag);
      if(this.flag == true){
        this.router.navigate(['/','homepage-component']);
      }
  
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Enter a valid E-mail or password',
        })
      }
  
  }
}
}
