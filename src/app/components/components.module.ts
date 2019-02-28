/***************************************************************
// Copyright 2017-2018 SavannaBoat Inc. All rights reserved.
  ___   ___   ___   _  _ _  _   _     ___  ___   _ _____
 / __| /_\ \ / /_\ | \| | \| | /_\   | _ )/ _ \ /_\_   _|
 \__ \/ _ \ V / _ \| .` | .` |/ _ \  | _ \ (_) / _ \| |
 |___/_/ \_\_/_/ \_\_|\_|_|\_/_/ \_\ |___/\___/_/ \_\_|

*****************************************************************/

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleAddComponent } from './schedule-add/schedule-add.component';
import { ScoreComponent } from './score/score.component';
import { ScoreButtonComponent } from './score-button/score-button.component';
import { ScoreDetailComponent } from './score-detail/score-detail.component';
import { TimerComponent } from './timer/timer.component';
import { TimerButtonComponent } from './timer-button/timer-button.component';


@NgModule({
  declarations: [
    ScheduleComponent,
    ScheduleAddComponent,
    ScoreComponent,
    ScoreButtonComponent,
    ScoreDetailComponent,
    TimerComponent,
    TimerButtonComponent
  ],
  imports: [CommonModule,
            IonicModule,
            FormsModule],
  exports: [
    ScheduleComponent,
    ScheduleAddComponent,
    ScoreComponent,
    ScoreButtonComponent,
    ScoreDetailComponent,
    TimerComponent,
    TimerButtonComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
