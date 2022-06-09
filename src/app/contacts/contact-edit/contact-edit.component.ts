import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      if (!this.id) {
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);
      if (!this.originalContact) return;

      this.editMode = true;
      this.contact = { ...this.originalContact };
      if (this.contact.group) this.groupContacts = [...this.contact.group];
    });
  }

  onSubmit(form: NgForm) {
    const { name, email, phone, imageUrl } = form.value;
    const id = this.id || this.contactService.getNextId();
    const newContact = new Contact(
      id,
      name,
      email,
      phone,
      imageUrl,
      this.groupContacts
    );

    if (this.editMode)
      this.contactService.updateContact(this.originalContact, newContact);
    else this.contactService.addContact(newContact);

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) return true;

    if (this.contact && newContact.id === this.contact.id) return true;

    for (let contact of this.groupContacts)
      if (newContact.id === contact.id) return true;

    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    if (this.isInvalidContact(selectedContact)) return;

    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) return;

    this.groupContacts.splice(index, 1);
  }
}
