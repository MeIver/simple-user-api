// 类型定义
export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    age?: number;
    address?: string;
    phone?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateUserDto {
    username: string;
    email: string;
    password: string;
    age?: number;
    address?: string;
    phone?: string;
}