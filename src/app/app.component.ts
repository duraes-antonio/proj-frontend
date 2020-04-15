import {Component} from '@angular/core';
import {ListLink} from './models/componentes/list-link';
import {AuthService} from './services/auth.service';
import {ListLinkService} from './services/list-link.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proj-frontend';
  listLinks: ListLink[] = [];
  sidenavShow = false;
  authServRef = AuthService;

  constructor(private _listLinkServ: ListLinkService) {
    AuthService.loadFromLocalToken();
    _listLinkServ.get().subscribe(
      (lists: ListLink[]) => this.listLinks = lists
    );
  }
}
