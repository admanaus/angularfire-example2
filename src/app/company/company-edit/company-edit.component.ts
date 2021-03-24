import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  company$: Observable<Company | undefined>;

  constructor(private companyService: CompanyService) { 
    this.company$ = this.companyService.getCompanyObservable();
  }

  ngOnInit(): void {
  }

  saveCompany(company) {
        // this.companyService.saveCompany(company);
        this.companyService.saveCompany({name: company.name});
  }

  editCompany(company) {
    this.companyService.editCompany({
      phone: '123-456-7890',
      address: '1234 Acme St.'
    });
  }

  deleteCompany() {
    this.companyService.deleteCompany();
  }

}
