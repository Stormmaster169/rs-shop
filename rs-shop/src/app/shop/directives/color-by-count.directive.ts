import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { Colors } from '../../app.enums';

@Directive({
  selector: '[colorByCount]'
})
export class ColorByCountDirective implements OnInit {
  @Input('colorByCount') public count: number;

  @HostBinding('style.color') public color: string = 'transparent';

  private setColor(count: number): string {
    if (count > 19) {
      return Colors.ORANGE;
    }
    if (count > 6) {
      return Colors.GREEN;
    }

    return Colors.RED;
  }

  public ngOnInit(): void {
    this.color = this.setColor(this.count);
  }
}
