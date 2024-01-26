import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, QRCodeModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  text: string = ''
  qrText: string = ''
  isDownloading: boolean = false

  onKey(val: any) {
    this.text = val.target.value
  }

  generateQR() {
    this.qrText = this.text
    this.text = ''
  }


  downloadQRCode() {
    const qrCodeImg = document.querySelector('canvas');
    if (qrCodeImg) {
      this.isDownloading = true
      const link = document.createElement('a');
      link.href = qrCodeImg.toDataURL('image/png');
      link.download = 'QR_Code.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => {
        this.isDownloading = false
      }, 1000);
    }
  }
  print() {
    const qrCodeImg = document.querySelector('canvas');
    if (qrCodeImg) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write('<html><head><title>QR Code</title></head><body>');
        printWindow.document.write('<img src="' + qrCodeImg.toDataURL('image/png') + '" style="max-width: 100%;">');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      } else {
        console.error('Failed to open print window.');
      }
    }
  }

}
