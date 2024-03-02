import { Column, Index, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, AfterInsert, AfterUpdate, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
  /**
   * this decorator will help to auto generate id for the table.
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: true, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 30, nullable: true, name: 'last_name' })
  lastName: string;

  @Column({ type: 'varchar', length: 15 })
  @Index({ unique: true })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'int', default: 0 })
  age: number;

  @Column({ type: 'varchar', select: false })
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'], default: 'u' })
  gender: string;

  @Column({ type: 'enum', enum: ['active', 'deactive', 'blocked'], default: 'active' })
  status: string;

  @Column({ type: 'bool', default: false, name: 'is_verified' })
  isVerified: string;


  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @AfterUpdate()
  @AfterInsert()
  private removePassword(): void {
    delete this.password
  }

  async bcryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password, () => { });
  }
}