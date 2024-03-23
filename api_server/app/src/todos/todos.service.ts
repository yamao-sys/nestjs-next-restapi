import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import {
  CreateTodoDto,
  FetchAllTodosDto,
  UpdateTodoDto,
} from 'api/todos/@types';
import { validate } from 'class-validator';

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

  async buildNewTodo(dto: CreateTodoDto, userId: string) {
    const todo = new Todo();
    todo.title = dto.title;
    todo.content = dto.content;
    todo.userId = userId;

    return todo;
  }

  async validate(todo: Todo) {
    return validate(todo);
  }

  async save(todo: Todo) {
    return await this.todoRepository.save(todo);
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
