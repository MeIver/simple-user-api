import { Request, Response } from 'express';
import UserModel from '../models/UserModel';

export class UserController {
    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    // 长方法示例
    async createUser(req: Request, res: Response) {
        try {
            const { username, email, password, age, address, phone } = req.body;
            
            // 验证逻辑冗长
            if (!username) return res.status(400).json({ error: '用户名必填' });
            if (!email) return res.status(400).json({ error: '邮箱必填' });
            if (!password) return res.status(400).json({ error: '密码必填' });
            if (password.length < 6) return res.status(400).json({ error: '密码至少6位' });
            if (age && age < 0) return res.status(400).json({ error: '年龄无效' });
            if (address && address.length > 200) return res.status(400).json({ error: '地址过长' });
            if (phone && !/^1\d{10}$/.test(phone)) return res.status(400).json({ error: '手机号无效' });
            
            // 业务逻辑
            const exists = await this.userModel.findByEmail(email);
            if (exists) return res.status(409).json({ error: '邮箱已存在' });
            
            const user = await this.userModel.create({ username, email, password, age, address, phone });
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json({ error: '服务器错误' });
        }
    }

    async getUser(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const user = await this.userModel.findById(id);
        if (!user) return res.status(404).json({ error: '用户未找到' });
        return res.json(user);
    }

    // 与ConfigController重复的验证逻辑
    validateId(id: string): boolean {
        const numId = parseInt(id);
        return !isNaN(numId) && numId > 0;
    }
}