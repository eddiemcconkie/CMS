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

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact {
    return this.contacts.find((contact) => contact.id === id);
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
  }

  addContact(newContact: Contact) {
    if (!newContact) return;

    newContact.id = this.getNextId();
    this.contacts.push(newContact);
    this.contactChangedEvent.next([...this.contacts]);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    let index = this.contacts.indexOf(originalContact);
    if (index < 0) return;

    newContact.id = originalContact.id;
    this.contacts.splice(index, 1, newContact);
    this.contactChangedEvent.next([...this.contacts]);
  }

  getMaxId() {
    return this.contacts.reduce(
      (maxId, contact) => (+contact.id > +maxId ? contact.id : maxId),
      0
    );
  }

  getNextId() {
    this.maxContactId = `${+this.maxContactId + 1}`;
    return this.maxContactId;
  }
}
