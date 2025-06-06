import { Component, OnInit } from '@angular/core';
import { ClientHistoryRecordModel } from 'src/models/client-history-record-model';
import { HistoryService } from 'src/services/history-service';


@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.page.html',
  styleUrls: ['./client-history.page.scss'],
})
export class ClientHistoryPage implements OnInit {
  selectedDate: string = new Date().toISOString();
  history: ClientHistoryRecordModel[] = [];

  constructor(private historyService: HistoryService) { }

  ngOnInit() {
    this.loadHistory();
  }

  onDateChange(event: any) {
    const newDate = event.detail.value;
    this.selectedDate = newDate;
    this.loadHistory();
  }


  loadHistory() {
    const date = this.selectedDate.split('T')[0];
    this.historyService.getClientHistoryByDate(date).subscribe({
      next: (response) => {
        this.history = response;
      },
      error: (err) => {
        console.error('Erro ao carregar histórico:', err);
        this.history = [];
      }
    });
  }
}
