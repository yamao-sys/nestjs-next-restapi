import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { ApiCreatedResponse } from '@nestjs/swagger';
import {
  DeleteTodoResponseDto,
  FetchTodoDto,
  UpdateTodoResponseDto,
} from 'api/todos/@types';
import { CreateTodoDto } from './dto/create_todo.dto';
import { UpdateTodoDto } from './dto/update_todo.dto';
import { CreateTodoResponseDto } from './dto/create_todo_response.dto';
import { format_validation_errors } from 'src/lib/format_validation_errors';
import { FetchAllTodosResponseDto } from './dto/find_all_todos_response.dto';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiCreatedResponse({
    type: FetchAllTodosResponseDto,
    description: 'ログインユーザのTODO一覧取得',
  })
  async index(@Request() req: { user: JwtPayload }) {
    return await this.todosService.findAll(req.user.userId);
  }

  @Post()
  @ApiCreatedResponse({
    type: CreateTodoResponseDto,
    description: 'ログインユーザのTODO作成成功',
  })
  async create(
    @Request() req: { user: JwtPayload },
    @Body() dto: CreateTodoDto,
  ) {
    const todo = await this.todosService.buildNewTodo(dto, req.user.userId);
    const validationErrors = await this.todosService.validate(todo);
    if (!!validationErrors.length) {
      return { errors: format_validation_errors(validationErrors) };
    }

    try {
      const savedTodo = await this.todosService.save(todo);
      return { title: savedTodo.title, content: savedTodo.content };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async show(
    @Request() req: { user: JwtPayload },
    @Param('id') id: string,
  ): Promise<FetchTodoDto> {
    const todo = await this.todosService.read(id, req.user.userId);
    if (!todo) {
      throw new NotFoundException({
        statusCode: 404,
        message: '該当するTODOがありません。',
      });
    }
    return { id: todo.id, title: todo.title, content: todo.content };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTodoDto,
    @Request() req: { user: JwtPayload },
  ): Promise<UpdateTodoResponseDto> {
    const todo = await this.todosService.read(id, req.user.userId);
    if (!todo) {
      throw new NotFoundException({
        statusCode: 404,
        message: '該当するTODOがありません。',
      });
    }
    try {
      const updatedTodo = await this.todosService.update(todo, dto);

      return { title: updatedTodo.title, content: updatedTodo.content };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async delete(
    @Request() req: { user: JwtPayload },
    @Param('id') id: string,
  ): Promise<DeleteTodoResponseDto> {
    const todo = await this.todosService.read(id, req.user.userId);
    if (!todo) {
      throw new NotFoundException({
        statusCode: 404,
        message: '該当するTODOがありません。',
      });
    }
    try {
      await this.todosService.delete(todo);

      return { message: 'TODOの削除に成功しました。' };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
