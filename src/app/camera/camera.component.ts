import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera',
  template: `
  <video #video autoplay playsinline [ngStyle]="videoStyle()"></video>
  
  <label><input type="checkbox" [checked]="blur" (change)="blur = !blur" />blur</label>
  <label><input type="checkbox" [checked]="sepia" (change)="sepia = !sepia" />sepia</label>
  <label><input type="checkbox" [checked]="invert" (change)="invert = !invert" />invert</label>
  <label><input type="checkbox" [checked]="flip" (change)="flip = !flip" />flip</label>
`,
styles: [`
  video { max-width:100%; }
  label {
    text-transform: uppercase;
    font-family: Lato;
    margin-right: 5px;
  }
`]
})
export class CameraComponent implements OnInit {
  @ViewChild('video') video;
  blur: boolean;
  sepia: boolean;
  invert: boolean;
  flip: boolean;

  constructor() { }

  ngOnInit() {
    const videoElement: HTMLVideoElement = this.video.nativeElement;

    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' }
    }).then(stream => {
      videoElement.srcObject = stream;
    });
  }

  videoStyle() {
    let filter = '';
    let transform = '';

    if (this.blur) {
      filter += 'blur(5px)';
    }
    if (this.sepia) {
      filter += 'sepia(60%)';
    }
    if (this.invert) {
      filter += 'invert(1)';
    }
    if (this.flip) {
      transform += 'scaleX(-1)';
    }

    return {
      filter,
      transform
    };
  }
}
