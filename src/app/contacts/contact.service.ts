import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactChangedEvent = new Subject<Contact[]>();

  contacts: Contact[] = [];
  maxContactId: string;

  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http
      .get<Contact[]>(
        'https://wdd430-cms-7118c-default-rtdb.firebaseio.com/contacts.json'
      )
      .subscribe({
        next: (contacts) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => (a.name > b.name ? 1 : -1));
          this.contactChangedEvent.next(this.contacts.slice());
        },
        error: (error) => console.log(error),
      });
  }

  storeContacts() {
    this.http
      .put(
        'https://wdd430-cms-7118c-default-rtdb.firebaseio.com/contacts.json',
        this.contacts
      )
      .subscribe(() => {
        this.contactChangedEvent.next(this.contacts.slice());
      });
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.storeContacts();
  }

  addContact(newContact: Contact) {
    if (!newContact) return;

    newContact.id = this.getNextId();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    let index = this.contacts.indexOf(originalContact);
    if (index < 0) return;

    newContact.id = originalContact.id;
    this.contacts.splice(index, 1, newContact);
    this.storeContacts();
  }

  getMaxId() {
    return this.contacts.reduce<string>(
      (maxId, contact) => (+contact.id > +maxId ? contact.id : maxId),
      '0'
    );
  }

  getNextId() {
    this.maxContactId = `${+this.maxContactId + 1}`;
    return this.maxContactId;
  }
}
