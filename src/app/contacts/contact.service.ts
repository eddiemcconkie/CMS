import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactChangedEvent = new Subject<Contact[]>();

  contacts: Contact[] = [];
  maxContactId: string;

  constructor(private http: HttpClient) {}

  getContacts() {
    this.http.get<Contact[]>('http://localhost:3000/contacts').subscribe({
      next: (contacts) => {
        this.contacts = contacts;
        this.sortAndSend();
      },
      error: (error) => console.log(error),
    });
  }

  sortAndSend() {
    this.contacts.sort((a, b) => (a.name > b.name ? 1 : -1));
    this.contactChangedEvent.next([...this.contacts]);
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  deleteContact(contact: Contact) {
    if (!contact) return;

    const index = this.contacts.findIndex((c) => c.id === contact.id);
    if (index < 0) return;

    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe((response) => {
        this.contacts.splice(index, 1);
        this.sortAndSend();
      });
  }

  addContact(contact: Contact) {
    if (!contact) return;

    this.http
      .post<{ message: string; contact: Contact }>(
        'http://localhost:3000/contacts',
        contact
      )
      .subscribe((responseData) => {
        this.contacts.push(responseData.contact);
        this.sortAndSend();
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    let index = this.contacts.findIndex((c) => c.id === originalContact.id);
    if (index < 0) return;

    newContact.id = originalContact.id;
    this.http
      .put('http://localhost:3000/contacts/' + originalContact.id, newContact)
      .subscribe((response) => {
        this.contacts.splice(index, 1, newContact);
        this.sortAndSend();
      });
  }
}
