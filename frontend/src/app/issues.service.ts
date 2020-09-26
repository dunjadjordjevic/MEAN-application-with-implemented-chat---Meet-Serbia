import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { }

  getIssues()
  {
    return this.http.get(`${this.uri}/issues`);
  }

  getIssueById(id)
  {
    return this.http.get(`${this.uri}/issues/${id}`)
  }

  addIssue(title, responsible, description, severity)
  {
    //status nepotreban, ima defaultni 
    const issue= {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity      
    };

    //drugi parametar post metode je body deo, gde ide ono sto ubacujem u bazu
    return this.http.post(`${this.uri}/issues/add`, issue);

  }

  updateIssue(id, title, responsible, description, severity, status)
  {
    const issue= {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity,
      status: status      
    };

    return this.http.post(`${this.uri}/issues/update/${id}`, issue);
  }

  deleteIssue(id)
  {
    return this.http.get(`${this.uri}/issues/delete/${id}`);
  }
}
