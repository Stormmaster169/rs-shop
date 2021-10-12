import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'advantages-card',
  templateUrl: './advantages-card.component.html',
  styleUrls: ['./advantages-card.component.scss']
})
export class AdvantagesCardComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
