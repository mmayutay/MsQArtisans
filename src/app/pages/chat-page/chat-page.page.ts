import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.page.html',
  styleUrls: ['./chat-page.page.scss'],
})
export class ChatPagePage implements OnInit {

  constructor(private route:ActivatedRoute) {
    console.log(route.snapshot.paramMap.get('userId'));
    // const socket = io('http://localhost:3000', );
    const io = require("socket.io-client");
    const socket = io("http://localhost:3000", {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });
  }
  
  ngOnInit() {
  }

}
