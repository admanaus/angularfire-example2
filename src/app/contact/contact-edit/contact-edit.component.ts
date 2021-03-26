import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from 'src/app/models/contact';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/company/company.service';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  contact$: Observable<Contact | undefined>;
  companies$: Observable<Company[]>;

  constructor(
    private contactService: ContactService,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { 
      if (!this.isNew) {
        this.contact$ = contactService.getContactObservable(this.id);
      } else {
        this.contact$ = of({}) as Observable<Contact>;
      }
      this.companies$ = this.companyService.getCompaniesObservable();
  }

  ngOnInit(): void {
    this.id;
  }

  saveContact(contact) {
        this.contactService.saveContact(contact);
  }

  editContact(contact) {
    this.contactService.editContact(this.cleanContact(contact));
  }

  deleteContact() {
    this.contactService.deleteContact(this.id)
      .then(_ => this.router.navigate(['/contact/all']));
  }

  get id(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  get isNew(): boolean {
    return this.id === 'new';
  }

  cleanContact(contact): Contact {
    contact.id = this.id;
    if(!contact.name){contact.name = "default name"};
    if(!contact.phone){contact.phone = "placeholder value"};
    return contact
  }

}
