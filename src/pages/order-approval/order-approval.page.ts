import { Component } from '@angular/core';
import { ToastService } from 'src/services/toast.service';
import { AlertController } from '@ionic/angular';

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  orderNumber: number;
  customerName: string;
  items: OrderItem[];
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'normal' | 'high';
  processedAt?: Date;
  processedBy?: string;
  rejectionReason?: string;
}

interface Order {
  id: number;
  orderNumber: number;
  customerName: string;
  items: OrderItem[];
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'normal' | 'high';
}

@Component({
  selector: 'app-order-approval',
  templateUrl: './order-approval.page.html',
  styleUrls: ['./order-approval.page.scss'],
})
export class OrderApprovalPage {
  currentDate = new Date();

  activeOrders: Order[] = [
    {
      id: 1,
      orderNumber: 1001,
      customerName: 'João Silva',
      items: [
        { id: 101, name: 'Corte de Cabelo', quantity: 1, price: 50.00 },
        { id: 102, name: 'Barba', quantity: 1, price: 30.00 },
        { id: 103, name: 'Hidratação', quantity: 1, price: 40.00 }
      ],
      amount: 120.00,
      date: '2023-10-01',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      orderNumber: 1002,
      customerName: 'Maria Oliveira',
      items: [
        { id: 201, name: 'Manicure', quantity: 1, price: 35.00 },
        { id: 202, name: 'Pedicure', quantity: 1, price: 40.00 }
      ],
      amount: 75.00,
      date: '2023-10-02',
      status: 'pending',
      priority: 'normal'
    }
  ];

  processedOrders: Order[] = [
    {
      id: 3,
      orderNumber: 1003,
      customerName: 'Carlos Souza',
      items: [
        { id: 301, name: 'Corte Social', quantity: 1, price: 45.00 },
        { id: 302, name: 'Sobrancelha', quantity: 1, price: 20.00 }
      ],
      amount: 65.00,
      date: '2023-10-03',
      status: 'approved',
      priority: 'normal',
      processedAt: new Date('2023-10-03T10:30:00'),
      processedBy: 'Admin'
    },
    {
      id: 4,
      orderNumber: 1004,
      customerName: 'Ana Santos',
      items: [
        { id: 401, name: 'Coloração', quantity: 1, price: 80.00 }
      ],
      amount: 80.00,
      date: '2023-10-04',
      status: 'rejected',
      priority: 'normal',
      processedAt: new Date('2023-10-04T11:15:00'),
      processedBy: 'Admin',
      rejectionReason: 'Produto indisponível'
    }
  ];

  showRejectModal = false;
  selectedOrder: Order | null = null;
  rejectReason: string = '';
  isLoading: boolean = false;
  filter: string = 'all';

  constructor(
    private toastService: ToastService,
    private alertController: AlertController
  ) { }

  get filteredOrders() {
    if (this.filter === 'pending') {
      return this.activeOrders.filter(order => order.status === 'pending');
    } else if (this.filter === 'highPriority') {
      return this.activeOrders.filter(order => order.priority === 'high');
    } else if (this.filter === 'history') {
      return [...this.processedOrders]
        .sort((a, b) => (b.processedAt?.getTime() || 0) - (a.processedAt?.getTime() || 0))
        .slice(0, 5);
    }
    return this.activeOrders;
  }

   getServiceIcon(serviceName: string): string {
    const icons: { [key: string]: string } = {
      'Corte de Cabelo': 'cut',
      'Corte Social': 'cut',
      'Barba': 'barbell',
      'Manicure': 'hand-left',
      'Pedicure': 'foot',
      'Hidratação': 'water',
      'Sobrancelha': 'eye',
      'Coloração': 'color-fill'
    };
    return icons[serviceName] || 'pricetag';
  }


  async approveOrder(order: Order) {
    const confirm = await this.alertController.create({
      header: 'Confirmar Aprovação',
      message: `Deseja aprovar o pedido #${order.orderNumber} de ${order.customerName}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aprovar',
          handler: async () => {
            await this.processApproval(order);
          }
        }
      ]
    });

    await confirm.present();
  }

  private async processApproval(order: Order) {
    try {
      this.isLoading = true;
      await this.simulateRequest();

      const approvedOrder = {
        ...order,
        status: 'approved' as const,
        processedAt: new Date(),
        processedBy: 'Usuário Atual' 
      };

      this.processedOrders.unshift(approvedOrder); 
      this.activeOrders = this.activeOrders.filter(o => o.id !== order.id);

      this.toastService.show(`Pedido #${order.orderNumber} aprovado!`, 'success');
    } catch (error) {
      this.toastService.show('Falha ao aprovar pedido.', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async rejectOrder(order: Order) {
    const alert = await this.alertController.create({
      header: 'Confirmar Rejeição',
      message: `Deseja rejeitar o pedido #${order.orderNumber}?`,
      inputs: [{
        name: 'reason',
        type: 'text',
        placeholder: 'Motivo da rejeição'
      }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Rejeitar',
          handler: async (data) => {
            await this.processRejection(order, data.reason);
          }
        }
      ]
    });

    await alert.present();
  }

  private async processRejection(order: Order, reason: string) {
    try {
      this.isLoading = true;
      await this.simulateRequest();

      const rejectedOrder = {
        ...order,
        status: 'rejected' as const,
        processedAt: new Date(),
        processedBy: 'Usuário Atual', 
        rejectionReason: reason
      };

      this.processedOrders.unshift(rejectedOrder);
      this.activeOrders = this.activeOrders.filter(o => o.id !== order.id);

      this.toastService.show(`Pedido #${order.orderNumber} rejeitado.`, 'danger');
    } catch (error) {
      this.toastService.show('Falha ao rejeitar pedido.', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

 getServiceColor(serviceName: string): string {
    const colors: { [key: string]: string } = {
      'Corte de Cabelo': 'primary',
      'Corte Social': 'primary',
      'Barba': 'secondary',
      'Manicure': 'tertiary',
      'Pedicure': 'tertiary',
      'Hidratação': 'success',
      'Sobrancelha': 'warning',
      'Coloração': 'danger'
    };
    return colors[serviceName] || 'medium';
  }

  simulateRequest(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}