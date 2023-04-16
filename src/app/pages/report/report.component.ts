import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  findFilteredDate(): void {
    const myDate = new Date('2023-04-16T00:00:00Z');
    const epochTime = myDate.getTime();
    console.log('Epoch time:', epochTime);
  }


}
