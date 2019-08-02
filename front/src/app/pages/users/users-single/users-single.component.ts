import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-users-single',
  template: `
    <p>
      users-single works!
    </p>
  `,
  styles: []
})
export class UsersSingleComponent implements OnInit {

  public id;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.params['id']

  }

}
