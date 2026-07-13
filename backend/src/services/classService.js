import { ClassRepository } from '../repositories/classRepository.js';

export class ClassService {
    constructor() {
        this.classRepository = new ClassRepository();
    }

    // ログイン中の教師が担当するクラス一覧を、クラスごとの生徒数付きで返す
    async getTeacherClasses(teacher) {
        const classNames = await this.classRepository.findClassesByUserId(teacher.id);
        const classes = await Promise.all(classNames.map(async (className) => {
            const students = await this.classRepository.findStudentsBySchoolAndClass(teacher.school_id, className);
            return { class: className, studentCount: students.length };
        }));
        return classes;
    }

    // 教師が担当するクラスに限り、同じschool_idのstudentアカウント一覧を返す
    async getClassStudents(teacher, className) {
        const ownClasses = await this.classRepository.findClassesByUserId(teacher.id);
        if (!ownClasses.includes(className)) {
            throw new Error('このクラスを閲覧する権限がありません。');
        }
        return this.classRepository.findStudentsBySchoolAndClass(teacher.school_id, className);
    }
}
