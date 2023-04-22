import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CapsulesService } from 'src/app/services/capsules.service';

@Component({
  selector: 'app-add-capsule',
  templateUrl: './add-capsule.component.html',
  styleUrls: ['./add-capsule.component.scss']
})
export class AddCapsuleComponent implements OnInit {
  capsuleData = {
    title: '',
    section: '',
    uid_owner: localStorage.getItem('uid'),
    name_owner: localStorage.getItem('name'),
    reviewers: '',
    status: 'Unassigned',
    file: '',
    blob_file: null,
  }
  constructor(private router: Router, private capsulesService: CapsulesService) { }

  ngOnInit(): void {
  }
  onFileSelected(event): void {
    // const selectedFile = <File>event.target.files[0];
    let blob = new Blob(event.target.files, { type: event.target.files[0].type });
    let url = window.URL.createObjectURL(blob);
    this.capsuleData.file = event.target.files[0].name
    this.capsuleData.blob_file = blob

    // if (selectedFile.type === 'application/pdf') {
    //   const fileReader = new FileReader();
    //   fileReader.readAsArrayBuffer(selectedFile);

    //   fileReader.onload = () => {
    //     const pdfBlob = new Blob([fileReader.result], { type: 'application/pdf' });
    //     console.log('PDF Blob:', pdfBlob);
    //     this.capsuleData.file = selectedFile.name
    //     this.capsuleData.blob_file = pdfBlob
    //     console.log(pdfBlob)
    //   };
    // } else {
    //   console.log('Invalid file type. Only PDF files are allowed.');
    // }
  }
  addCapsule(): void {
    this.capsulesService.create(this.capsuleData).subscribe(
      response => {
        alert('Success')
        this.router.navigate(['research/'])
      }

    )
  }
}
