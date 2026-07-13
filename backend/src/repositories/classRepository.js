import { getSupabaseAdmin } from '../config/supabaseClient.js';

export class ClassRepository {
    constructor() {
        this.supabase = getSupabaseAdmin();
    }

    // 指定accountが所属する（教師なら担当している）クラス名の一覧を返す
    async findClassesByUserId(userId) {
        const { data, error } = await this.supabase
            .from('account_class')
            .select('class')
            .eq('user_id', userId);
        if (error) throw error;
        return [...new Set(data.map(row => row.class))];
    }

    // 同じschool_id・同じclassに所属するstudentロールのaccount一覧を返す
    async findStudentsBySchoolAndClass(schoolId, className) {
        const { data, error } = await this.supabase
            .from('account_class')
            .select('account:account!inner(user_id, user_name, role, school_id, deleted_at)')
            .eq('class', className)
            .eq('account.school_id', schoolId)
            .eq('account.role', 'student')
            .is('account.deleted_at', null);
        if (error) throw error;
        return data.map(row => ({
            id: row.account.user_id,
            username: row.account.user_name
        }));
    }

    // アカウント作成時に、所属クラスをaccount_classへ登録する
    async create(userId, className) {
        const { error } = await this.supabase
            .from('account_class')
            .insert({ user_id: userId, class: className });
        if (error) throw error;
    }
}
