import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string = ''): Contact[] {
    return term.length > 0
      ? contacts.filter((contact) =>
          contact.name.toLowerCase().includes(term.toLowerCase())
        )
      : contacts;
  }
}
