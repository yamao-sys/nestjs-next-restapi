import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { CreateTodoDto } from './dto/create_todo.dto';
import { UpdateTodoDto } from './dto/update_todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(userId: string) {
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

  async assignUpdateAttribute(todo: Todo, dto: UpdateTodoDto) {
    todo.title = dto.title;
    todo.content = dto.content;

    return todo;
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
