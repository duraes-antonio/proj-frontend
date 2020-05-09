import {AfterViewInit, Component} from '@angular/core';
import {ListLink} from './models/componentes/list-link';
import {AuthService} from './services/auth.service';
import {ListLinkService} from './services/lists/list-link.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'proj-frontend';
  listLinks: ListLink[] = [];
  sidenavShow = false;
  authServRef = AuthService;
  readonly pseudoBodyId = 'body-content';

  constructor(private _listLinkServ: ListLinkService) {
    AuthService.loadFromLocalToken();
    _listLinkServ.get().subscribe(
      (lists: ListLink[]) => this.listLinks = lists
    );
  }

  ngAfterViewInit(): void {
    const body = document.getElementById(this.pseudoBodyId) as HTMLElement;
    const headerHeight = document.getElementById('navbar')?.clientHeight;
    const footerHeight = document.getElementById('footer')?.clientHeight;
    if (body) {
      const minSize = window.innerHeight - 1 - (headerHeight ?? 0) - (footerHeight ?? 0);
      body.style.minHeight = `${minSize}px`;
    }
  }
}
