import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuizComponent } from './quiz_component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizRoutingModule } from './quiz_rooting-module';
import { QuizService } from './quiz_service';
import { Helper } from '../utility/helper';
import { UtilityModule } from '../utility/utility_module';
import { QuizResultComponent } from '../result/result_component';

@NgModule({
  declarations: [QuizComponent, QuizResultComponent],
  imports: [QuizRoutingModule, FormsModule, CommonModule, UtilityModule],
  providers: [QuizService, Helper],
})
export class QuizModule {}