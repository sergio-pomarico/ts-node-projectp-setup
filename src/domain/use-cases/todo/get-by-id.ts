import { TODORepository } from '@domain/repositories/todo';
import TODOEntity from '@domain/entities/todo';
import { inject, injectable } from 'inversify';

@injectable()
export class GetTodoByIdUseCase {
  constructor(
    @inject('TODORepository')
    private repository: TODORepository,
  ) {}
  run = async (id: string): Promise<TODOEntity> => {
    const todo = await this.repository.getById(id);
    return todo!;
  };
}
