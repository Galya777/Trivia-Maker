import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader_componer.html',
  styleUrls: ['./loader_componer.scss'],
})
export class LoaderComponent implements OnInit {
  constructor() {}

  @Input('loading') loading: boolean = false;
  ngOnInit(): void {}
}