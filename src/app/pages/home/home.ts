import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme';
import { Header } from "../../components/header/header";

@Component({
  selector: 'app-home',
  imports: [Header],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
readonly themeSvc = inject(ThemeService);
}
