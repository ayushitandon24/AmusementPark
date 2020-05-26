import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth/auth.service';
import { AppUser } from './../interfaces/app-user';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-emaillogin',
  templateUrl: './emaillogin.component.html',
  styleUrls: ['./emaillogin.component.css']
})
export class EmailloginComponent implements OnInit {
  user:AppUser;

  constructor(public auth: AuthService) {
    this.user= <AppUser>{};
   }

  ngOnInit() {
      
    $(document).ready(function(){
      $('#password').mouseleave(function(){
        var len=$('#password').val().length;
        var error = $('#error').text();
        if(error===""  && len>0 )
        {
          $('#btn').prop('disabled', false);
        }
        else{
          $('#btn').prop('disabled', true);
        }
      });
  
  });
}
  login() {

    
    this.auth.login(this.user);
    
    
  }
}
