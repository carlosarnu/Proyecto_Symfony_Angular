// src/app/modules/tasks-page-component/tasks-page-component.ts
import { CommonModule } from '@angular/common';
import { Component, ViewChild, effect, signal } from '@angular/core';
import { BackToLandingButtonComponent } from '../../shared/components/back-to-landing-button/back-to-landing-button';
import { PageTitleComponent } from '../../shared/components/page-title/page-title';
import { TaskFormComponent } from './components/task-form-component/task-form-component';
import { TaskListComponent } from './components/task-list-component/task-list-component';
import { TaskApiService } from '../../features/tasks/data/task-api';
import { TaskPayload } from '../../shared/interfaces/tasks';
import { TaskFiltersComponent } from './components/task-filters-component/task-filters-component';
import { ToastService } from '../../shared/services/toast-service';
import { NavbarComponent } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [
    CommonModule,
    BackToLandingButtonComponent,
    PageTitleComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskFiltersComponent,
    NavbarComponent
  ],
  templateUrl: './tasks-page-component.html',
})
export class TasksPageComponent {

  @ViewChild(TaskListComponent) list?: TaskListComponent;

  // ✅ Añadimos señal para tema
  theme = signal<'light' | 'dark'>(localStorage.getItem('theme') as 'light' | 'dark' || 'light');

  constructor(
    private readonly api: TaskApiService,
    private readonly toast: ToastService
  ) {
    // efecto: aplica clase dark al <html> y guarda elección en localStorage
    effect(() => {
      const root = document.documentElement;
      if (this.theme() === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', this.theme());
    });
  }

  // método para cambiar tema
  toggleTheme() {
    this.theme.set(this.theme() === 'light' ? 'dark' : 'light');
  }

  onTaskSubmitted(payload: TaskPayload) {
    this.api.createTask(payload).subscribe({
      next: () => {
        this.list?.loadTasks();
        console.log('Tarea creada correctamente');
        this.toast.success('Tarea guardada');
      },
      error: (err) => {
        console.error('Error al crear la tarea', err);
        this.toast.error('No se pudo guardar la tarea');
      },
    });
  }

  onFiltersApply(f: { q?: string; estado?: 'pendiente' | 'en progreso' | 'completada'; fechaDesde?: string | null; fechaHasta?: string | null }) {
    this.list?.loadTasks({ q: f.q, estado: f.estado });
  }
}