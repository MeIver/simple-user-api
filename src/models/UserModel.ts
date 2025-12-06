import { User, CreateUserDto } from './types';

// 上帝类示例 - 承担过多职责
export default class UserModel {
    private users: User[] = [];
    private nextId = 1;

    // 数据操作
    async create(data: CreateUserDto): Promise<User> {
        const user: User = {
            id: this.nextId++,
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.users.push(user);
        return user;
    }

    async findById(id: number): Promise<User | null> {
        return this.users.find(u => u.id === id) || null;
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(u => u.email === email) || null;
    }

    async update(id: number, data: Partial<CreateUserDto>): Promise<User | null> {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) return null;
        
        this.users[index] = { ...this.users[index], ...data, updatedAt: new Date() };
        return this.users[index];
    }

    async delete(id: number): Promise<boolean> {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) return false;
        
        this.users.splice(index, 1);
        return true;
    }

    async findAll(): Promise<User[]> {
        return [...this.users];
    }

    // 非核心职责 - 应该拆分
    validatePassword(password: string): boolean {
        return password.length >= 6;
    }

    // 工具方法 - 增加类复杂度
    formatUserForDisplay(user: User): any {
        return {
            id: user.id,
            username: user.username,
            email: user.email
        };
    }
}