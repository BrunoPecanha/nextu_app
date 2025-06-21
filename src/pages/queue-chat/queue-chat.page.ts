import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/services/chat.service';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-queue-chat',
  templateUrl: './queue-chat.page.html',
  styleUrls: ['./queue-chat.page.scss'],
})
export class QueueChatPage implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  filterModalOpen = false;
  queueId!: string;
  messages: ChatMessage[] = [];
  newMessage = '';
  queueInfo: QueueInfo | null = null;

  private messagesSub!: Subscription;
  private queueInfoSub!: Subscription;

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.queueId = this.route.snapshot.params['id'];
    this.loadChatData();
  }

  ngOnDestroy() {
    this.messagesSub?.unsubscribe();
    this.queueInfoSub?.unsubscribe();
  }


  ngAfterViewInit() {
    this.scrollToBottom();
  }

  private loadChatData() {
    this.messagesSub = this.chatService.getMessages(this.queueId).subscribe(
      messages => this.messages = messages
    );

    this.queueInfoSub = this.chatService.getQueueInfo(this.queueId).subscribe(
      info => this.queueInfo = info
    );
  }

  openFilterModal() {
    this.filterModalOpen = true;
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.newMessage, this.queueId).subscribe(() => {
        this.newMessage = '';
      });
    }
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        if (this.chatContainer?.nativeElement) {
          this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
        }
      }, 100);
    } catch (err) {
      console.error('Erro ao fazer scroll:', err);
    }
  }

  clearMessage() {
    this.newMessage = '';
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

interface ChatMessage {
  id: string;
  user: string;
  text: string;
  time: Date;
  isCurrentUser: boolean;
}

interface QueueInfo {
  id: string;
  businessName: string;
  position: number | 0;
  status: 'active' | 'paused';
  estimatedTime?: number;
}