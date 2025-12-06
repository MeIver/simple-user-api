import { Request, Response } from 'express';
import UserModel from '../models/UserModel'; // 控制器依赖模型，但模型也导入类型可能形成循环

export class ConfigController {
    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel(); // 潜在循环依赖
    }

    async getUserConfig(req: Request, res: Response) {
        const userId = req.params.userId;
        
        // 与UserController重复的验证逻辑
        const numId = parseInt(userId);
        if (isNaN(numId) || numId <= 0) {
            return res.status(400).json({ error: '无效的用户ID' });
        }
        
        const user = await this.userModel.findById(numId);
        if (!user) return res.status(404).json({ error: '用户未找到' });
        
        return res.json({ theme: 'dark', notifications: true });
    }

    async updateConfig(req: Request, res: Response) {
        // 简单更新逻辑
        return res.json({ success: true });
    }
}