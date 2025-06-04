import { Column } from '../decorator'
import { ModelBase } from './ModelBase'

export class AppService extends ModelBase {
  @Column()
  public test!: string
}
