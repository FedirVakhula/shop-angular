import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {

  AppTaskManager =  { App: 'TaskManager', Ver: '1.0', API_URL: 'http://...' };

  constructor() { }
}

export const AppTaskManager = new ConstantService().AppTaskManager;
