/**
 * ファイル名: frontend/src/views/StudentManagement/index.js
 * 概要: 教師向け「学生管理」画面（View）の実装
 * 役割:
 *   - 教師権限アカウントのみ閲覧できるクラス別の生徒一覧表示
 *   - account / account_class を参照し、同じschool_id・同じclassのstudentアカウントを表示する
 */
import { getClassStudents, getMyClasses } from '../../data/classApi.js';
import { fetchExperiments } from '../../data/schoolApi.js';
import { DashboardView } from '../Dashboard/index.js';
import './style.css';
import template from './template.html?raw';

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('vcl_user') || 'null');
    } catch {
        return null;
    }
}

function showListMessage(listEl, message) {
    listEl.replaceChildren();
    const messageEl = document.createElement('div');
    messageEl.classList.add('student-list-empty');
    messageEl.textContent = message;
    listEl.appendChild(messageEl);
}

// 通常ログインユーザーの実験進捗保存は未実装のため、生徒一覧は表示できるが進捗値はまだ持てない。
function renderStudentRows(listEl, students) {
    if (students.length === 0) {
        showListMessage(listEl, '対象の生徒データがありません。');
        return;
    }

    listEl.replaceChildren();
    students.forEach(student => {
        const row = document.createElement('div');
        row.classList.add('student-row');

        const nameEl = document.createElement('div');
        nameEl.classList.add('student-name');
        nameEl.textContent = student.username;

        const track = document.createElement('div');
        track.classList.add('progress-track');
        const fill = document.createElement('div');
        fill.classList.add('progress-fill');
        fill.style.width = '0%';
        track.appendChild(fill);

        const percentEl = document.createElement('div');
        percentEl.classList.add('student-percent');
        percentEl.textContent = '記録なし';

        row.appendChild(nameEl);
        row.appendChild(track);
        row.appendChild(percentEl);
        listEl.appendChild(row);
    });
}

export function StudentManagementView(navigateTo) {
    const user = getCurrentUser();

    // 教師権限アカウントのみ閲覧可能。それ以外はダッシュボードへ戻す。
    if (!user || user.role !== 'teacher') {
        console.warn('学生管理画面は教師権限アカウントのみ閲覧できます');
        return DashboardView(navigateTo);
    }

    const container = document.createElement('div');
    container.classList.add('view-container');
    container.innerHTML = template;

    const classSelect = container.querySelector('#class-select');
    const experimentSelect = container.querySelector('#experiment-select');
    const listEl = container.querySelector('#student-list');

    const loadStudents = async (className) => {
        if (!className) {
            renderStudentRows(listEl, []);
            return;
        }
        showListMessage(listEl, '読み込み中...');
        try {
            const students = await getClassStudents(className);
            renderStudentRows(listEl, students);
        } catch (error) {
            showListMessage(listEl, `生徒一覧の取得に失敗しました: ${error.message}`);
        }
    };

    (async () => {
        showListMessage(listEl, '読み込み中...');
        try {
            const classes = await getMyClasses();
            if (classes.length === 0) {
                classSelect.disabled = true;
                showListMessage(listEl, '担当クラスが登録されていません。');
                return;
            }
            classes.forEach(({ class: className, studentCount }) => {
                const option = document.createElement('option');
                option.value = className;
                option.textContent = `${className}（${studentCount}名）`;
                classSelect.appendChild(option);
            });
            await loadStudents(classSelect.value);
        } catch (error) {
            showListMessage(listEl, `クラス一覧の取得に失敗しました: ${error.message}`);
        }
    })();

    (async () => {
        try {
            const experiments = await fetchExperiments();
            experiments.forEach(experiment => {
                const option = document.createElement('option');
                option.value = experiment.experiment_code;
                option.textContent = experiment.experiment_name;
                experimentSelect.appendChild(option);
            });
        } catch (error) {
            console.error('実験一覧の取得に失敗しました', error);
        }
    })();

    classSelect.addEventListener('change', () => loadStudents(classSelect.value));

    return container;
}
