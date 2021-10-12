import { Directive, HostBinding, Input, OnInit } from '@angular/core';
import { Colors, GoodsCount } from '../../app.enums';

@Directive({
  selector: '[colorByCount]'
})
export class ColorByCountDirective implements OnInit {
  @Input('colorByCount') public count: number;

  @HostBinding('style.color') public color: string = 'transparent';

  private setColor(count: number): string {
    if (count > GoodsCount.MIDDLE) {
      return Colors.GREEN;
    }
    if (count > GoodsCount.LOW) {
      return Colors.ORANGE;
    }

    return Colors.RED;
  }

  public ngOnInit(): void {
    this.color = this.setColor(this.count);
  }
}
