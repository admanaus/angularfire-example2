import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyService } from 'src/app/company/company.service';
import { Company } from 'src/app/models/company';
import { Contact } from 'src/app/models/contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  public contacts$: Observable<Contact[]>;
  companies$: Observable<Company[]>;

  constructor(
    private contactService: ContactService,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts() {
    this.contacts$ = this.contactService.getContactsObservable();
    this.companies$ = this.companyService.getCompaniesObservable();
  }

  onSelectionChange($event) {
    console.log($event);
    this.contacts$ = this.contactService.getContactsByCompanyIdObservable($event.value);
  }

}
