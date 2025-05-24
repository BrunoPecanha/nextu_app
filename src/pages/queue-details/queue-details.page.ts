import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentMethodEnum } from 'src/models/enums/payment-method';
import { QueueReportResponse } from 'src/models/responses/queue-report-response';
import { QueueService } from 'src/services/queue-service';
@Component({
  selector: 'app-queue-details',
  templateUrl: './queue-details.page.html',
  styleUrls: ['./queue-details.page.scss'],
})
export class QueueDetailsPage implements OnInit {

  payment = PaymentMethodEnum;
  queueId!: number;
  totalAttendedClients: number = 0;
  totalPix: number = 0;
  totalCard: number = 0;
  totalCash: number = 0;
  total: number = 0;
  selectedDate = '';
  report: QueueReportResponse | null = null;

  constructor(private route: ActivatedRoute, private queueService: QueueService) {
  }

  ngOnInit() {
    this.queueId = Number(this.route.snapshot.paramMap.get('id')!);
    this.loadReport();
  }

  loadReport() {
    if (!this.queueId) {
      return;
    }

    this.queueService.getQueueReport(this.queueId).subscribe({
      next: (response) => {
        this.report = response;
        this.selectedDate = new Date(this.report.data[0].queueDate).toISOString().split("T")[0];
        this.getTotalAttendedClients();
        this.getTotalAmmount();
      },
      error: (err) => {
        console.error('Erro ao carregar filas disponíveis:', err);
      }
    });
  }

  getTotalAttendedClients(): void {
    if (this.report) {
      this.totalAttendedClients = this.report.data.length;
    }
  }

  getTotalAmmount(): void {
    this.report?.data.forEach(client => {
      if (client.paymentMethod === this.payment.pix) {
        this.totalPix += client.amount;
      } else if (client.paymentMethod === this.payment.card) {
        this.totalCard += client.amount;
      } else if (client.paymentMethod === this.payment.cash) {
        this.totalCash += client.amount;
      }
    });

    this.total = this.totalPix + this.totalCard + this.totalCash;
  }
}