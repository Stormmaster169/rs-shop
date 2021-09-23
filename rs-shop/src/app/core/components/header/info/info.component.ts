import { Component, OnInit } from '@angular/core';
import { VisitorsService } from 'src/app/core/services/visitors.service';

interface City {
  name: string
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

export class InfoComponent implements OnInit {

  private ipaddress: string = '';

  public city: string = '';

  public cities: City[];

  public selectedCity: City;

  constructor(private visitorsService: VisitorsService) { }

  public ngOnInit() {
    this.visitorsService.getIpAddress().subscribe((res) => {
      this.ipaddress = res.ip!;
      this.visitorsService.getGEOLocation(this.ipaddress).subscribe((res) => {

        this.city = res.city;

        this.cities = [
          {name: '"Минск"'},
          {name: '"Брест"'},
          {name: '"Витебск"'},
          {name: '"Гомель"'},
          {name: '"Гродно"'},
          {name: '"Могилев"'}
        ];
      });
    });
  }
}
