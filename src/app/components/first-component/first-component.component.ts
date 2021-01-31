import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ConfigOptionsService } from 'src/app/core/services/config-options.service';
import { AppTaskManager, ConstantService } from 'src/app/core/services/constant.service';
import { Generator, generatorFactory } from 'src/app/core/services/generator.factory';
import { GeneratorService } from 'src/app/core/services/generator.service';
import { localStorageInstance, LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.scss'],
  providers: [
    { provide: ConstantService, useValue: AppTaskManager },
    { provide: Generator, useFactory: generatorFactory(20), deps: [GeneratorService] },
    { provide: LocalStorageService, useValue: localStorageInstance }
  ]
})
export class FirstComponentComponent implements OnInit {
  title = 'Internet Market';
  constructor(
    @Optional() private configOptionsService: ConfigOptionsService,
    @Optional() private constantService: ConstantService,
    @Inject(Generator) private generator: string,
    @Optional() private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.configOptionsService.setUser({ email: '1111' });
    const user = this.configOptionsService.getUser();
    console.log(user);
    console.log(this.constantService);
    console.log('Generated token:', this.generator);
    this.localStorageService.setItemLocalStorage('user', { lorem: 'lorem' });
    console.log(this.localStorageService.getItemLocalStorage('user'));
  }

}
