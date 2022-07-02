import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindRefService } from 'src/app/wind-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  nativeWindow: Window;

  constructor(
    private documentService: DocumentService,
    private windowRefService: WindRefService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.nativeWindow = this.windowRefService.getNativeWindow();
    this.route.data.subscribe(({ document }) => {
      this.document = document;
    });
    // this.route.params.subscribe((params) => {
    //   this.document = this.documentService.getDocument(params.id);
    // });
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['documents']);
  }
}
