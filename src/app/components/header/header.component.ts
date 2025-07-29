import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { WorkflowService } from '../../services/workflow.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    public themeService: ThemeService,
    public workflowService: WorkflowService,
    public store: StoreService
  ) {}

  testFunc($event: boolean): void {
    this.workflowService.setIsProcessing($event);
  }
}
