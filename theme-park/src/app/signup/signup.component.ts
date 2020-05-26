import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { AppUser } from './../interfaces/app-user';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  newuser: AppUser;
 
  

  constructor(public auth: AuthService,private router: Router) {
    this.newuser= <AppUser>{};
   }

  ngOnInit() {
    
    $(document).ready(function(){
      $('#confirmpassword').mouseleave(function(){
        var len=$('#password').val().length;
        var error = $('#error').text();
        var cpwd=$('#confirmpassword').val();
        var pwd=$('#password').val();
        if(error==="" && cpwd===pwd && len>0 )
        {
          $('#btn').prop('disabled', false);
        }
        else{
          $('#btn').prop('disabled', true);
        }
      });
      $('#confirmpassword').mouseleave(function(){
        var cpwd=$('#confirmpassword').val();
        var pwd=$('#password').val();
        if( cpwd!=pwd){
          
        $("#error1").css("display", "block");
        }
        else{ $("#error1").css("display", "none");

        }
      });
      $('#check').mouseenter(function(){
       
        var len=$('#password').val().length;
        var error = $('#error').text();
        var cpwd=$('#confirmpassword').val();
        var pwd=$('#password').val();
        
        if(error==="" && cpwd===pwd && len>0 )
        {
          $('#btn').prop('disabled', false);
          $('#error1').prop('disabled', true);
        }
        else{
          $('#btn').prop('disabled', true);
        }
      });
   
   
  });
}

  signup() {

    this.newuser.isAdmin=false;
    this.auth.signup(this.newuser);

    
    
  }

}


