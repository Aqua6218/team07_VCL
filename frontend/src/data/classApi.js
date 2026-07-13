const API_BASE = '/api/classes';

// 通常ログイン(vcl_token)の教師アカウント用API。account / account_class を参照して
// 同じschool_id・同じclassのstudentアカウントを取得する。
function authHeaders() {
    const token = localStorage.getItem('vcl_token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
}

async function parseResponse(response) {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.error || 'Request failed');
    }
    return data;
}

// ログイン中の教師が担当するクラス一覧（クラス名・生徒数）を取得する。
export async function getMyClasses() {
    const response = await fetch(`${API_BASE}/mine`, { headers: authHeaders() });
    return parseResponse(response);
}

// 指定クラスに所属する生徒アカウント一覧を取得する。
export async function getClassStudents(className) {
    const response = await fetch(`${API_BASE}/${encodeURIComponent(className)}/students`, { headers: authHeaders() });
    return parseResponse(response);
}
