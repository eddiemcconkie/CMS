import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Document 1', 'The first document', 'doc1.pdf', []),
    new Document('2', 'Document 2', 'The second document', 'doc2.pdf', []),
    new Document('3', 'Document 3', 'The third document', 'doc3.pdf', []),
    new Document('4', 'Document 4', 'The fourth document', 'doc4.pdf', []),
  ];

  constructor() {}

  ngOnInit(): void {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
