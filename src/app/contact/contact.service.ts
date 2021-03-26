import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Contact } from '../models/contact';
import { Observable, from, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactRef: AngularFirestoreDocument<Contact>;
  private contactsRef: AngularFirestoreCollection<Contact>;


  constructor(private db: AngularFirestore) {
    this.contactRef = this.db.doc<Contact>('contacts/NLRCdg7aRrnYaG0uPUsL');
    this.contactsRef = this.db.collection<Contact>('contacts');

  }

  getContactsObservable(): Observable<Contact[]> {
    return this.contactsRef.snapshotChanges()
      .pipe(
        map((items: DocumentChangeAction<Contact>[]): Contact[] => {
          return items.map((item: DocumentChangeAction<Contact>): Contact => {
            return {
              id: item.payload.doc.id,
              name: item.payload.doc.data().name,
              phone: item.payload.doc.data().phone
            };
          });
        }),
        catchError(this.errorHandler)
      );
  }

   getContactObservable(id: string): Observable<Contact> {
     return this.db.doc<Contact>(`contacts/${id}`).valueChanges()
     .pipe(
      catchError(this.errorHandler)
    );
   }

  saveContact(contact: Contact) {
    console.log('contact on save', contact)
    this.contactsRef.add(contact)
      .then(_ => console.log('success on add'))
      .catch(error => console.log('add', error));
  }

  editContact(contact: Contact) {
    this.contactsRef.doc(contact.id).update(contact)
      .then(_ => console.log('Success on update'))
      .catch(error => console.log('update', error));
  }

  deleteContact(id: string) {
    return this.contactsRef.doc(id).delete()
      .then(_ => console.log('Success on delete'))
      .catch(error => console.log('delete', error));
  }

  private errorHandler(error) {
    console.log(error);
    return throwError(error);
  }

}

