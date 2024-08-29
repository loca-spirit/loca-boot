import {Column, DataModel, ModelBase} from 'loca-boot-core';

export class ColumnCamelCaseItem extends ModelBase {
  @Column()
  public message!: string;
}
