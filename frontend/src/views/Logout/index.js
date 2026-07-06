import '../Login/style.css';
import './style.css';
import template from './template.html?raw';
import { updateSidebarAuthState } from '../../components/Sidebar.js';

function clearAllTokens() {
    localStorage.removeItem('vcl_token');
    localStorage.removeItem('vcl_user');
    localStorage.removeItem('vcl_student_token');
    localStorage.removeItem('vcl_teacher_access_token');
}

export function LogoutView(navigateTo) {
    // 未ログイン状態ならそのままログイン画面へ
    const isLoggedIn = !!(
        localStorage.getItem('vcl_token') ||
        localStorage.getItem('vcl_student_token')
    );
    if (!isLoggedIn) {
        setTimeout(() => navigateTo('/login'), 0);
        return document.createElement('div');
    }

    const container = document.createElement('div');
    container.innerHTML = template;

    // ユーザー情報の表示
    try {
        const user = JSON.parse(localStorage.getItem('vcl_user') || 'null');
        if (user) {
            const nameEl = container.querySelector('#logout-user-name');
            const roleEl = container.querySelector('#logout-user-role');
            const roleMap = { student: '生徒', teacher: '教師', admin: '管理者' };
            if (nameEl) nameEl.textContent = user.nickname || user.username || 'Unknown';
            if (roleEl) roleEl.textContent = roleMap[user.role] || user.role || 'GUEST';
        }
    } catch {
        // ユーザー情報が取得できない場合はデフォルト表示のまま
    }

    // ログアウト確定ボタン
    const btnConfirm = container.querySelector('#btn-logout-confirm');
    if (btnConfirm) {
        btnConfirm.addEventListener('click', () => {
            clearAllTokens();
            updateSidebarAuthState();
            navigateTo('/login');
        });
    }

    // キャンセルボタン → ひとつ前の画面（ダッシュボード）に戻る
    const btnCancel = container.querySelector('#btn-logout-cancel');
    if (btnCancel) {
        btnCancel.addEventListener('click', () => {
            navigateTo('/dashboard');
        });
    }

    return container;
}
