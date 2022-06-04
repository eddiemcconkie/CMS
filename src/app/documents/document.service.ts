import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];
  maxDocumentId: string;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    return this.documents.find((document) => document.id === id);
  }

  deleteDocument(document: Document) {
    if (!document) return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.documentChangedEvent.next(this.documents.slice());
  }

  addDocument(newDocument: Document) {
    if (!newDocument) return;

    newDocument.id = this.getNextId();
    this.documents.push(newDocument);
    this.documentChangedEvent.next([...this.documents]);
  }

  updateDocument(originalDoc: Document, newDoc: Document) {
    if (!originalDoc || !newDoc) return;

    let index = this.documents.indexOf(originalDoc);
    if (index < 0) return;

    newDoc.id = originalDoc.id;
    this.documents.splice(index, 1, newDoc);
    this.documentChangedEvent.next([...this.documents]);
  }

  getMaxId() {
    return this.documents.reduce(
      (maxId, document) => (+document.id > +maxId ? document.id : maxId),
      '0'
    );
  }

  getNextId() {
    this.maxDocumentId = `${+this.maxDocumentId + 1}`;
    return this.maxDocumentId;
  }
}
