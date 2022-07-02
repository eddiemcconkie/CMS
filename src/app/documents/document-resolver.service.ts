import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { DocumentService } from './document.service';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentResolverService implements Resolve<Document> {
  constructor(private documentService: DocumentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Document | Observable<Document> | Promise<Document> {
    const id = route.params.id;
    if (this.documentService.getDocuments.length > 0) {
      return this.documentService.getDocument(id);
    }

    return this.documentService
      .loadDocuments()
      .pipe(map((documents) => documents.find((doc) => doc.id === id)));
  }
}
