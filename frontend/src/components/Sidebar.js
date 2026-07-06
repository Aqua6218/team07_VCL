function isLoggedIn() {
    return !!(
        localStorage.getItem('vcl_token') ||
        localStorage.getItem('vcl_student_token')
    );
}

function getUser() {
    try {
        return JSON.parse(localStorage.getItem('vcl_user') || 'null');
    } catch {
        return null;
    }
}

/**
 * サイドバーのログイン/ログアウトアイテムをログイン状態に合わせて更新する。
 * 画面遷移のたびに呼び出す。
 */
export function updateSidebarAuthState() {
    const item = document.getElementById('nav-auth-item');
    if (!item) return;

    if (isLoggedIn()) {
        const user = getUser();
        const label = user?.nickname || user?.username || 'アカウント';
        item.querySelector('.nav-icon').textContent = '🚪';
        item.querySelector('.nav-label').textContent = 'ログアウト';
        item.dataset.id = 'logout';
        item.title = `${label} としてログイン中`;
    } else {
        item.querySelector('.nav-icon').textContent = '🔑';
        item.querySelector('.nav-label').textContent = 'ログイン';
        item.dataset.id = 'login';
        item.title = '';
    }
}

/**
 * サイドバーの初期化
 * @param {Function} navigateCallback - ナビゲーション実行時のコールバック (id を受け取る)
 */
export function initSidebar(navigateCallback) {
    updateSidebarAuthState();

    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.dataset.id;

            // ログアウトはログアウト画面へ遷移して処理する
            if (id === 'logout') {
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                if (navigateCallback) navigateCallback('logout');
                return;
            }

            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            if (navigateCallback) navigateCallback(id);
        });
    });
}
