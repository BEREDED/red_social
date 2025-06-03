import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private emailSource = new BehaviorSubject<string>('');
  currentEmail = this.emailSource.asObservable();

  constructor() { }

  setEmail(email: string) {
    this.emailSource.next(email);
  }
}
