import { ModelBase } from './ModelBase'
import { Column } from '../decorator'

export class AppService extends ModelBase {
  @Column()
  public test!: string
}
