import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser, Location } from '@angular/common';

function getWindow(): any {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class SSRService {
  constructor(
    @Inject(PLATFORM_ID) public platformId: any,
    public location: Location
  ) {}

  get nativeWindow(): Window {
    return getWindow();
  }

  switchToSSL() {
    const location = this.nativeWindow.location as any;

    // if(isPlatformBrowser(this.platformId))
    // {
    //   alert(`the protocol is ${location?.protocol}`);
    // }
    if (location?.protocol === 'http:') {
      location.href = location?.href.replace('http', 'https');
    }
  }
}
