import { UserService } from './../user/user.service';
import { AppUser } from './../../interfaces/app-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { AngularFireDatabase } from 'angularfire2/database';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;
  newuser: AppUser;
  
  

  constructor(private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,private db: AngularFireDatabase) {
                 
    this.user$ = afAuth.authState;
    
  }
  
  login(user)
  {
    const saltrounds=10;
    bcrypt.hash(user.password,saltrounds,function(err,hash){
      if (err){
      console.log(err);
      }
      console.log(user.password,hash)
      user.password=hash});
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(
      value => {
        console.log('Success!', value);
        this.router.navigate(['/home']);
      }
    ).catch( err => {
      console.log('Something went wrong:',err.message);
    })
  }

  loginwithgoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    // tslint:disable-next-line:no-trailing-whitespace

    this.afAuth.auth.signInWithRedirect (new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }
  signup(newuser){
    // var require: any;
   
    const saltrounds=10;
    bcrypt.hash(newuser.password,saltrounds,function(err,hash){
      if (err){
      console.log(err);
      }
      console.log(newuser.password,hash)
      newuser.password=hash});
       this.afAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(
      value => {
        console.log('Success!', value);
        var ref=firebase.database().ref().child("users");
        ref.child(value.uid).set(newuser);
        // value.displayName=newuser.name;
      }
    ).catch( err => {
      console.log('Something went wrong:',err.message);
    })
   
  
}

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        // tslint:disable-next-line:curly
        if (user) return this.userService.get(user.uid);

        return Observable.of(null);

      });

  }

}
