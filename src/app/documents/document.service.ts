import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];
  maxDocumentId: string;

  constructor(private http: HttpClient) {}

  getDocuments() {
    this.http.get<Document[]>('http://localhost:3000/documents').subscribe({
      next: (documents) => {
        this.documents = documents;
        this.sortAndSend();
      },
      error: (error) => console.log(error),
    });
  }

  sortAndSend() {
    this.documents.sort((a, b) => (a.name > b.name ? 1 : -1));
    this.documentChangedEvent.next([...this.documents]);
  }

  getDocument(id: string): Document {
    return this.documents.find((document) => document.id === id);
  }

  loadDocuments() {
    return this.http.get<Document[]>('http://localhost:3000/documents');
  }

  deleteDocument(document: Document) {
    if (!document) return;

    const index = this.documents.findIndex((d) => d.id === document.id);
    if (index < 0) return;

    this.http
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe((response) => {
        this.documents.splice(index, 1);
        this.sortAndSend();
      });
  }

  addDocument(document: Document) {
    if (!document) return;

    document.id = '';

    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/documents',
        document
      )
      .subscribe((responseData) => {
        this.documents.push(responseData.document);
        this.sortAndSend();
      });
  }

  updateDocument(originalDoc: Document, newDoc: Document) {
    if (!originalDoc || !newDoc) return;

    let index = this.documents.findIndex((d) => d.id === originalDoc.id);
    if (index < 0) return;

    newDoc.id = originalDoc.id;
    this.http
      .put('http://localhost:3000/documents/' + originalDoc.id, newDoc)
      .subscribe((response) => {
        this.documents.splice(index, 1, newDoc);
        this.sortAndSend();
      });
  }
}
