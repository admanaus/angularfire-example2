import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Company } from 'src/app/models/company';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  company$: Observable<Company | undefined>;

  constructor(
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { 
      if (!this.isNew) {
        this.company$ = companyService.getCompanyObservable(this.id);
      } else {
        this.company$ = of({}) as Observable<Company>;
      }
  }

  ngOnInit(): void {
    this.id;
  }

  saveCompany(company) {
        this.companyService.saveCompany(company);
  }

  editCompany(company) {
    this.companyService.editCompany(this.cleanCompany(company));
  }

  deleteCompany() {
    this.companyService.deleteCompany(this.id)
      .then(_ => this.router.navigate(['/company/all']));
  }

  get id(): string {
    return this.activatedRoute.snapshot.paramMap.get('id');
  }

  get isNew(): boolean {
    return this.id === 'new';
  }

  cleanCompany(company): Company {
    company.id = this.id;
    if(!company.name){company.name = "default name"};
    if(!company.phone){company.phone = "placeholder value"};
    return company
  }

}
