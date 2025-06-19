import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

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
  position: number;
  status: 'active' | 'paused';
  estimatedTime?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  private queueInfoSubject = new BehaviorSubject<QueueInfo | null>(null);

  constructor() {
    this.mockInitialData();
  }

  private mockInitialData() {
    const initialMessages: ChatMessage[] = [
      {
        id: '1',
        user: 'Bruno',
        text: 'Tem muita gente para atender ainda?',
        time: new Date(Date.now() - 3600000),
        isCurrentUser: false
      },
      {
        id: '2',
        user: 'Você',
        text: 'Acho que tem umas 5 pessoas na frente',
        time: new Date(Date.now() - 1800000),
        isCurrentUser: true
      },
      {
        id: '3',
        user: 'Thiago',
        text: 'Não sei, a fila tá pausada',
        time: new Date(Date.now() - 900000),
        isCurrentUser: false
      }
    ];

    const initialQueueInfo: QueueInfo = {
      id: 'queue-123',
      businessName: 'Barbearia do Zé',
      position: 3,
      status: 'active',
      estimatedTime: 45
    };

    this.messagesSubject.next(initialMessages);
    this.queueInfoSubject.next(initialQueueInfo);
  }

  getMessages(queueId: string): Observable<ChatMessage[]> {
    return of(this.messagesSubject.value).pipe(delay(500));
  }

  getQueueInfo(queueId: string): Observable<QueueInfo> {
    return of(this.queueInfoSubject.value!).pipe(delay(300));
  }

  sendMessage(message: string, queueId: string): Observable<ChatMessage> {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      user: 'Você',
      text: message,
      time: new Date(),
      isCurrentUser: true
    };

    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, newMessage]);

    setTimeout(() => {
      this.mockOtherUserResponse();
    }, 1000 + Math.random() * 2000);

    return of(newMessage).pipe(delay(200));
  }

  private mockOtherUserResponse() {
    const users = ['Bruno', 'Thiago', 'Carlos', 'Ana'];
    const responses = [
      'A fila andou agora pouco',
      'Ainda está parada',
      'O atendente chamou mais 2 pessoas',
      'Acho que vai demorar ainda',
      'Está quase minha vez',
      'Alguém sabe se vai demorar muito?',
      'Acabei de chegar, qual a posção de vocês?'
    ];

    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const responseMessage: ChatMessage = {
      id: Date.now().toString(),
      user: randomUser,
      text: randomResponse,
      time: new Date(),
      isCurrentUser: false
    };

    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, responseMessage]);
  }

  updateQueuePosition(queueId: string, newPosition: number): Observable<void> {
    const currentInfo = this.queueInfoSubject.value;
    if (currentInfo) {
      this.queueInfoSubject.next({
        ...currentInfo,
        position: newPosition
      });
    }
    return of(undefined).pipe(delay(300));
  }
}