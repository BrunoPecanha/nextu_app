import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-custom-header',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button 
            *ngIf="showStartButton"
            fill="clear" 
            (click)="handleStartButtonClick()" 
            [class]="startButtonClass"
            [disabled]="startDisabled || startLoading"
          >
            <ng-container *ngIf="!startLoading; else startSpinner">
              <ion-icon 
                [name]="startIconName" 
                slot="icon-only"
                [style.opacity]="startDisabled ? '0.5' : '1'"
              ></ion-icon>
            </ng-container>
            <ng-template #startSpinner>
              <ion-spinner name="dots" slot="icon-only"></ion-spinner>
            </ng-template>
          </ion-button>
          <ng-content select="[left-buttons]"></ng-content>
        </ion-buttons>

        <ion-title class="title-container">
          <div>{{ title }}</div>
          <div *ngIf="subtitle" class="subtitle">{{ subtitle }}</div>
        </ion-title>

        <ion-buttons slot="end">
          <ion-button 
            *ngIf="showEndButton"
            fill="clear" 
            (click)="!endDisabled && !endLoading && onEndClick.emit()" 
            [class]="endButtonClass"
            [disabled]="endDisabled || endLoading"
          >
            <ng-container *ngIf="!endLoading; else endSpinner">
              <ion-icon 
                [name]="endIconName" 
                slot="icon-only"
                [style.opacity]="endDisabled ? '0.5' : '1'"
              ></ion-icon>
            </ng-container>
            <ng-template #endSpinner>
              <ion-spinner name="dots" slot="icon-only"></ion-spinner>
            </ng-template>
          </ion-button>
          <ng-content select="[right-buttons]"></ng-content>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  `,
  styles: [`
    .start-button {
      --color: var(--ion-color-medium);
      --color-disabled: var(--ion-color-medium-shade);
    }

    .end-button {
      --color: var(--ion-color-primary);
      padding-right: 10px;
      --color-disabled: var(--ion-color-primary-shade);
    }

    ion-toolbar {
      --background: white;
      --border-width: 0;
      --min-height: 64px;
    }

    .title-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    ion-title div:first-child {
      font-weight: 600;
      font-size: 18px;
      line-height: 20px;
    }

    .subtitle {
      font-size: 12px;
      color: var(--ion-color-medium);
      margin-top: 2px;
    }
  `]
})
export class CustomHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;

  @Input() showStartButton: boolean = false;
  @Input() startIconName: string = 'arrow-back';
  @Input() startButtonClass: string = 'start-button';
  @Input() startDisabled: boolean = false;
  @Input() startLoading: boolean = false;
  @Output() onStartClick = new EventEmitter<void>();

  @Input() showEndButton: boolean = true;
  @Input() endIconName: string = 'add';
  @Input() endButtonClass: string = 'end-button';
  @Input() endDisabled: boolean = false;
  @Input() endLoading: boolean = false;
  @Output() onEndClick = new EventEmitter<void>();

  @Input() routeLink: string = '';

  profile: any;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private sesseionService: SessionService
  ) {
    this.profile = this.sesseionService.getProfile();
  }

  handleStartButtonClick() {
    if (this.isBackButton() && !this.startDisabled && !this.startLoading) {
      this.goBack();
    } else if (!this.startLoading) {
      this.onStartClick.emit();
    }
  }

  private isBackButton(): boolean {
    return ['arrow-back', 'arrow-back-outline', 'chevron-back', 'chevron-back-outline'].includes(this.startIconName);
  }

  private async goBack() {    
    try {
      const canGoBack = await this.navCtrl.pop();
      if (!canGoBack) {
        if (this.profile === 0) {
          if (this.routeLink) {
            this.router.navigate([this.routeLink], { replaceUrl: true });
          } else {
            this.router.navigate(['/queue'], {
              replaceUrl: true,
              state: { redirectedFromBack: true }
            });
          }
        } else {
          if (this.routeLink) {
            this.router.navigate([this.routeLink], { replaceUrl: true });
          } else {
            this.router.navigate(['/queue-admin'], {
              replaceUrl: true,
              state: { redirectedFromBack: true }
            });
          }
        }
      }
    } catch (error) {
      console.error('Navigation error:', error);
      this.router.navigate(['/role-registration'], { replaceUrl: true });
    }
  }
}