// src/common/scalars/email.scalar.ts
import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { BadRequestException } from '@nestjs/common';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

@Scalar('Email')
export class EmailScalar implements CustomScalar<string, string> {
  description = 'Kiểu dữ liệu xác thực định dạng địa chỉ Email';

  private validate(value: unknown): string {
    if (typeof value !== 'string' || !EMAIL_REGEX.test(value)) {
      throw new BadRequestException(`Định dạng email không hợp lệ: ${value}`);
    }
    return value;
  }

  // Chuyển từ Database/Resolver ra Client
  serialize(outputValue: unknown): string {
    return this.validate(outputValue);
  }

  // Chuyển từ Client Variables vào Resolver
  parseValue(inputValue: unknown): string {
    return this.validate(inputValue);
  }

  // Đọc từ chuỗi Literal trong inline GraphQL query
  parseLiteral(ast: ValueNode): string {
    if (ast.kind === Kind.STRING) {
      return this.validate(ast.value);
    }
    throw new BadRequestException('Email phải là chuỗi ký tự hợp lệ');
  }
}