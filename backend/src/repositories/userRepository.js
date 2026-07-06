import { getSupabaseAdmin } from '../config/supabaseClient.js';

export class UserRepository {
    constructor() {
        this.supabase = getSupabaseAdmin();
    }

    // account テーブルの行を authService が扱いやすい形に変換する
    _toUser(row) {
        if (!row) return null;
        return {
            id: row.user_id,
            username: row.user_name,
            nickname: row.user_name,
            email: row.email,
            password: row.password,
            role: row.role,
            school_id: row.school_id,
            created_at: row.created_at
        };
    }

    async findByEmail(email) {
        if (!email) return null;
        const { data, error } = await this.supabase
            .from('account')
            .select('user_id, user_name, password, email, role, school_id, created_at')
            .eq('email', email)
            .is('deleted_at', null)
            .maybeSingle();
        if (error) throw error;
        return this._toUser(data);
    }

    async findByUsername(username) {
        if (!username) return null;
        const { data, error } = await this.supabase
            .from('account')
            .select('user_id, user_name, password, email, role, school_id, created_at')
            .eq('user_name', username)
            .is('deleted_at', null)
            .maybeSingle();
        if (error) throw error;
        return this._toUser(data);
    }

    async create(user) {
        // email が未入力の場合はユーザー名ベースのプレースホルダーを使う（NOT NULL制約対応）
        const email = user.email || `${user.username}@vcl.local`;
        const now = new Date().toISOString();
        const { data, error } = await this.supabase
            .from('account')
            .insert({
                user_name: user.username,
                email,
                password: user.password,
                role: user.role || 'student',
                school_id: user.school_id || 1,
                created_at: now,
                updated_at: now
            })
            .select('user_id, user_name, password, email, role, school_id, created_at')
            .single();
        if (error) throw error;
        return this._toUser(data);
    }
}
