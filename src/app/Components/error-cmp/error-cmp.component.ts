import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-error-cmp',
  templateUrl: './error-cmp.component.html',
  styleUrls: ['./error-cmp.component.css']
})
export class ErrorCmpComponent implements OnInit {

  @Output() reload = new EventEmitter();
  @Input() errorTitle: string = '';
  constructor() { }

  ngOnInit(): void {
    let connectionStatus = navigator.onLine ? 'online' : 'offline';
    console.log('Connection Status: ', connectionStatus);
    if(connectionStatus === 'offline') this.errorTitle = "You are offline. Please check your connection."
  }

  onTryAgain() {
    this.reload.next(1);
  }

}
