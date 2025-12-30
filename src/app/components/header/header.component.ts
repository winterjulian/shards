import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NgOptimizedImage } from '@angular/common';
import { WorkflowService } from '../../services/workflow.service';
import { StoreService } from '../../services/store.service';
import {Router} from '@angular/router';

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
    public store: StoreService,
    public router: Router
  ) {}

  triggerWorkflow() {
    this.workflowService.setIsProcessing(!this.workflowService.isProcessing());
  }
}
