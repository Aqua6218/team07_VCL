/**
 * ファイル名: backend/src/services/authService.js
 * 概要: 認証ビジネスロジック
 * 役割:
 *   - パスワードのハッシュ化と検証 (bcrypt)
 *   - JWTトークンの生成と検証
 *   - ユーザー登録・ログインロジックの実行
 * アーキテクチャ: Service層
 */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ClassRepository } from '../repositories/classRepository.js';
import { UserRepository } from '../repositories/userRepository.js';
import { getJwtSecret } from '../utils/schoolJwt.js';

export class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
        this.classRepository = new ClassRepository();
    }

    async login(identifier, password) {
        // メールアドレスまたはユーザー名でユーザーを探す
        let user = null;
        if (identifier.includes('@')) {
            user = await this.userRepository.findByEmail(identifier);
        } else {
            user = await this.userRepository.findByUsername(identifier);
        }

        if (!user) {
            throw new Error('ユーザーIDまたはパスワードが間違っています。');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('ユーザーIDまたはパスワードが間違っています。');
        }

        // 署名付きトークンの発行(school_idはクラス閲覧APIでの生徒絞り込みに使う)
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, username: user.username, nickname: user.nickname, school_id: user.school_id },
            getJwtSecret(),
            { expiresIn: '24h' }
        );

        // パスワードを除外して返す
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }

    async register(username, email, password, nickname, role = 'student', className) {
        const existingUserByUsername = await this.userRepository.findByUsername(username);
        if (existingUserByUsername) {
            throw new Error('このユーザー名は既に登録されています。');
        }

        if (email) {
            const existingUserByEmail = await this.userRepository.findByEmail(email);
            if (existingUserByEmail) {
                throw new Error('このメールアドレスは既に登録されています。');
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // createメソッドはオブジェクトを受け取る
        const newUser = await this.userRepository.create({
            username,
            email: email || null,
            password: hashedPassword,
            nickname: nickname || username,
            role
        });

        // 教師の担当クラス・生徒の所属クラスとしてaccount_classへ登録する
        await this.classRepository.create(newUser.id, className);

        // 登録後すぐにログイン状態にするためにトークンを発行
        // createメソッドの戻り値には role が含まれない場合がある（DB insert結果のみの場合など）ので注意が必要だが、
        // userRepository.createの実装では {...user} を返しているので role は含まれるはず。
        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, role: newUser.role, username: newUser.username, nickname: newUser.nickname, school_id: newUser.school_id },
            getJwtSecret(),
            { expiresIn: '24h' }
        );

        const { password: _, ...userWithoutPassword } = newUser;
        return { user: userWithoutPassword, token };
    }
}
