import { DataTypes, Model, InferAttributes, InferCreationAttributes, NonAttribute } from '@sequelize/core'
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Index, Default, Table, BelongsTo, HasOne } from '@sequelize/core/decorators-legacy'

export enum UserType {
  ORGADMIN = 'ORGADMIN',
  USER = 'USER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  INVITED = 'INVITED',
}

@Table({
  timestamps: true,
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
  indexes: [
    {
      fields: ['orgId', 'email'],
      unique: true,
    },
  ],
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.INTEGER.UNSIGNED)
  @PrimaryKey
  @AutoIncrement
  id!: number

  @Attribute(DataTypes.STRING)
  firstName?: string

  @Attribute(DataTypes.STRING)
  lastName?: string

  @Attribute(DataTypes.STRING)
  @NotNull
  email!: string

  @Attribute(DataTypes.STRING)
  countryCode?: string

  @Attribute(DataTypes.STRING)
  phone?: string

  @Attribute(DataTypes.STRING)
  password!: string

  @Attribute(DataTypes.STRING)
  @Index()
  @Default(UserType.USER)
  @NotNull
  type!: UserType

  @Attribute(DataTypes.STRING)
  @NotNull
  status!: UserStatus

  @Attribute(DataTypes.INTEGER.UNSIGNED)
  roleId: number

  @Attribute(DataTypes.INTEGER.UNSIGNED)
  onboardedBy?: number

  @BelongsTo(() => User, 'onboardedBy')
  OnboardedBy?: NonAttribute<User>

  @Attribute(DataTypes.INTEGER.UNSIGNED)
  updatedBy!: number

  @Attribute(DataTypes.JSON)
  @Default({})
  extraData!: object

  @Attribute(DataTypes.INTEGER.UNSIGNED)
  orgId?: number

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  rememberMe?: boolean
}
