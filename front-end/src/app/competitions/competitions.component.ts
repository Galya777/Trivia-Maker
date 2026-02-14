import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpService } from '../http/http.service';

interface LeaderboardEntry {
  id: string;
  score: number;
  completed_at: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  test: {
    id: string;
    name: string;
  };
}

interface UserStats {
  totalTests: number;
  averageScore: number;
  bestScore: number;
}

@Component({
  selector: 'app-competitions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './competitions.component.html',
  styleUrl: './competitions.component.css'
})
export class CompetitionsComponent implements OnInit {
  isLoggedIn = false;
  leaderboard: LeaderboardEntry[] = [];
  userStats: UserStats | null = null;
  currentUserId: string | null = null;
  loading = false;
  error = '';

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    const token = localStorage.getItem('Authorization');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      this.isLoggedIn = true;
      const user = JSON.parse(userData);
      this.currentUserId = user.id || user._id;
      this.loadData();
    }
  }

  loadData() {
    this.loading = true;
    this.error = '';

    // Load leaderboard
    this.httpService.getLeaderboard().subscribe({
      next: (data) => {
        this.leaderboard = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading leaderboard:', err);
        this.error = 'Грешка при зареждане на класацията';
        this.loading = false;
      }
    });

    // Load user stats if logged in
    if (this.currentUserId) {
      this.httpService.getUserStats(this.currentUserId).subscribe({
        next: (data) => {
          this.userStats = data;
        },
        error: (err) => {
          console.error('Error loading user stats:', err);
        }
      });
    }
  }

  getRankClass(index: number): string {
    if (index === 0) return 'gold';
    if (index === 1) return 'silver';
    if (index === 2) return 'bronze';
    return '';
  }

  getRankEmoji(index: number): string {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `#${index + 1}`;
  }

  isCurrentUser(userId: string): boolean {
    return userId === this.currentUserId;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('bg-BG', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}
