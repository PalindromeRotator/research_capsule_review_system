import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CapsulesService } from 'src/app/services/capsules.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  date: Date = new Date();
  title = 'angular-app';
  fileName = `ReportGenerated-${this.date.getTime()}.xlsx`;
  from: NgbDateStruct;
  into: NgbDateStruct;

  resultArray: Array<Object> = []
  constructor(private capsulesService: CapsulesService) {

  }

  ngOnInit(): void {
  }


  getSelectedDate(from: NgbDateStruct): Date {
    const { year, month, day } = from;
    return new Date(year, month - 1, day);
  }
  findFilteredDate(): void {

    const from = this.getSelectedDate(this.from);
    const into = this.getSelectedDate(this.into);

    const epochTimeFrom = from.getTime();
    const epochTimeInto = into.getTime();

    this.capsulesService.getAll().subscribe(
      response => {
        var result: Array<Object> = [
        ]
        response.forEach(function (data) {
          var dataCreatedDate = new Date(data.createdAt);
          if (dataCreatedDate.getTime() >= epochTimeFrom && dataCreatedDate.getTime() <= epochTimeInto) {
            result.push(data)
          }
        })
        // this.resultArray = []
        console.log(result)
        this.resultArray = result
      }
    )
  }

  exportexcel(): void {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: 'Successfully download a report sheet',
    }).then((result) => {
      let element = document.getElementById('excel-table');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
    })
    /* pass here the table id */


  }

  downloadFile(file: any, title: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: 'Successfully download a capsule',
    }).then((result) => {
      const url = URL.createObjectURL(new Blob([file]));
      const link = document.createElement('a');
      link.download = `${title}.pdf`;
      link.href = url;
      link.click();
    })

  }

}
