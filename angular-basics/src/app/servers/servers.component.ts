import { Component, OnInit } from '@angular/core';

@Component({
  //selector: '.app-servers',
  //selector: '[app-servers]',
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  addNewServer = false; 
  serverName = '';
  isServerCreated = false;
  serverCreationStatus = "No server created!";
  servers = ['TestServer1', 'Test Server 2'];

  constructor() { 
    setTimeout(() => this.addNewServer = true, 2000);
  }

  ngOnInit(): void {
  }

  onAddServer() {
    this.isServerCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = `Server Created Successfully! Server Name is ${ this.serverName }`;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
