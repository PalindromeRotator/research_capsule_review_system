import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.scss']
})
export class ContentManagementComponent implements OnInit {

  contentData = {
    file: localStorage.getItem('content-image') ?? "./assets/img/brand/favicon0.png",
    blob_file: null,
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onFileSelected(event): void {
    // const selectedFile = <File>event.target.files[0];
    // let blob = new Blob(event.target.files, { type: event.target.files[0].type });
    // let url = window.URL.createObjectURL(blob);
    // this.capsuleData.file = event.target.files[0].name
    // this.capsuleData.blob_file = blob

    // console.log(event.target.files[0].type)
    // if (event.target.files[0].type === 'application/pdf') {
    //   const fileReader = new FileReader();
    //   fileReader.readAsArrayBuffer(event.target.files[0]);

    //   fileReader.onload = () => {
    //     const pdfBlob = new Blob([fileReader.result], { type: 'application/pdf' });
    //     console.log('PDF Blob:', pdfBlob);
    //     this.contentData.file = event.target.files[0].name
    //     this.contentData.blob_file = pdfBlob
    //     console.log(pdfBlob)
    //   };
    // } else {
    //   console.log('Invalid file type. Only PDF files are allowed.');
    // }

    const file = event.target.files[0];
    this.previewImage(file);
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.contentData.file = reader.result as string; // Set the image source to display the preview
    };
  }

  saveChanges(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: 'Changing content will make you logged out, Are you sure?',
      showCancelButton: true,
      confirmButtonText: "OK",
      denyButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('content-image', this.contentData.file)
        localStorage.removeItem('name');
        localStorage.removeItem('uid',)
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('user_type')
        this.router.navigate(['/'])
      } else {

      }
    })

  }

}
