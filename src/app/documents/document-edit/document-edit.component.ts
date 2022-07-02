import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ document }) => {
      // const id = params.id;
      // if (!id) {
      //   this.editMode = false;
      //   return;
      // }

      // this.originalDocument = this.documentService.getDocument(id);
      this.editMode = false;
      this.originalDocument = document;
      console.log(document);

      if (!this.originalDocument) return;

      this.editMode = true;
      this.document = { ...this.originalDocument };
      this.document.url = "I don't care";

      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
    // this.route.params.subscribe((params) => {
    //   const id = params.id;
    //   if (!id) {
    //     this.editMode = false;
    //     return;
    //   }

    //   this.originalDocument = this.documentService.getDocument(id);

    //   if (!this.originalDocument) return;

    //   this.editMode = true;
    //   this.document = { ...this.originalDocument };
    //   this.document.url = "I don't care";

    //   this.document = JSON.parse(JSON.stringify(this.originalDocument));
    // });
  }

  onSubmit(form: NgForm) {
    const { name, description, url } = form.value;
    const id = this.route.snapshot.params.id;
    const newDocument = new Document(id, name, url, description);

    if (this.editMode)
      this.documentService.updateDocument(this.originalDocument, newDocument);
    else this.documentService.addDocument(newDocument);

    this.onCancel();
  }

  onCancel() {
    // this.router.navigateByUrl('/documents');
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
