import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./models/product";
import { ApiService } from "./api.service";
import { SearchService } from "./search-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  name = "Angular";
  login: string = "";
  password: string = "";

  nom: string = "";
  prenom: string = "";
  cnx: boolean = false;
  constructor(
    private apiService: ApiService,
    private searchService: SearchService
  ) {
    this.getCatalogue();
  }
  connexion() {
    this.apiService.loginClient(this.login, this.password).subscribe((c) => {
      this.nom = c.nom;
      this.prenom = c.prenom;
      this.cnx = true;
      this.getCatalogue();
    });
  }

  crNom: string = "";
  crPrenom: string = "";
  crEmail: string = "";
  crLogin: string = "";
  crPassword: string = "";

  creer() {
    this.apiService
      .createClient(
        this.crNom,
        this.crPrenom,
        this.crEmail,
        this.crLogin,
        this.crPassword
      )
      .subscribe((c) => {
        console.log(c);
      });
  }

  getCatalogue() {
    this.searchService.setSearchParams("", null);
  }
}
