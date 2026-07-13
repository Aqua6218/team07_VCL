import jwt from 'jsonwebtoken';
import { getBearerToken } from '../config/supabaseClient.js';
import { getJwtSecret } from '../utils/schoolJwt.js';

// 通常ログイン(vcl_token)のAPI入口。authServiceが発行したJWTを検証し、req.userに payload をセットする。
export function requireAuth(req, res, next) {
    const token = getBearerToken(req.headers.authorization);
    if (!token) {
        return res.status(401).json({ error: '認証トークンが必要です。' });
    }

    try {
        req.user = jwt.verify(token, getJwtSecret());
        next();
    } catch {
        res.status(401).json({ error: '無効な認証トークンです。' });
    }
}

// 教師権限が必要なAPIの入口。requireAuthの後に使う。
export function requireTeacher(req, res, next) {
    if (req.user?.role !== 'teacher') {
        return res.status(403).json({ error: '教師権限アカウントが必要です。' });
    }
    next();
}
