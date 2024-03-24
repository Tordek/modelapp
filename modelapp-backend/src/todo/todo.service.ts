import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  create(createTodoDto: CreateTodoDto) {}

  findAll() {
    return [];
  }

  findOne(id: string) {
    throw new NotFoundException();
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {}

  remove(id: string) {}
}
