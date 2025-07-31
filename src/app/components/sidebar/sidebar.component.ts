import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  currentRoute: string = '';
  currentLocation:any = '/home';
  baseURl:any;
  constructor(private router: Router,
    private http: HttpClient,
    public location: Location,
    private route: ActivatedRoute
  ){
    this.baseURl = environment.Url
  }

  ngOnInit() {
    this.router.events.subscribe(params => {
      this.currentLocation = '';
      this.currentRoute = this.router.url;
      var _location = this.location.path();
      _location = _location.split('/')[1];
      if(_location && this.currentRoute != '/'){
        this.currentLocation = _location;
      }
    });
  }

}
