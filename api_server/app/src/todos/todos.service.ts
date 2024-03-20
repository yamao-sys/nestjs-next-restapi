import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import {
  CreateTodoDto,
  CreateTodoResponseDto,
  FetchAllTodosDto,
  UpdateTodoDto,
} from 'api/todos/@types';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(userId: string): Promise<FetchAllTodosDto> {
    const todos = await this.todoRepository.find({
      where: { userId },
    });

    return {
      todos: todos.map((todo) => ({
        id: todo.id,
        title: todo.title,
        content: todo.content,
      })),
    };
  }

  async create(
    dto: CreateTodoDto,
    userId: string,
  ): Promise<CreateTodoResponseDto> {
    const todo = new Todo();
    todo.title = dto.title;
    todo.content = dto.content;
    todo.userId = userId;

    await this.todoRepository.save(todo);

    return {
      title: todo.title,
      content: todo.content,
    };
  }

  async read(id: string, userId: string): Promise<Todo> {
    return await this.todoRepository.findOneBy({ id, userId });
  }

  async update(todo: Todo, dto: UpdateTodoDto): Promise<Todo> {
    return await this.todoRepository.save({ ...todo, ...dto });
  }

  async delete(todo: Todo): Promise<Todo> {
    return await this.todoRepository.remove(todo);
  }
}
